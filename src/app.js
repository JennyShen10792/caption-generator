require('./db');
require('./auth');
const passport = require('passport');
const path = require('path');

const routes = require('./routes/index');

const express = require('express');
const app = express();

const cheerio = require('cheerio');

const puppeteer = require('puppeteer');



const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', routes);


app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response){
	response.sendFile('/public/home.html', { root: '.' })
});



app.get('/api/captions', function(req, res) {

	console.log(req.query.type);
	console.log(req.query.category);

	if(req.query.category != null || req.query.category != "") {
		if (req.query.category == "songs"){
			let lyrics_list = [];
		
		(async () => {
	
		  const browser = await puppeteer.launch();
		  const page = await browser.newPage();
   		  try {
   		
			await page.goto('https://www.lyrics.com/lyrics/' + req.query.type, {timeout: 18000000});
			let bodyHTML = await page.evaluate(() => document.body.innerHTML);
			
			let $ = cheerio.load(bodyHTML);
			let label = $('.lyric-meta-title'); 
			let output = label.find('pre').text();
			
			$('.lyric-body').each((index, element) => {
				const captions = $(element).text();
				lyrics_list.push({
					'captions': captions
				})
			});

     	 }  catch(err) {
          		console.log(err);
      	 }

      await browser.close();
      console.log(lyrics_list)
      res.send(lyrics_list);	
	  })();
		}

		else if (req.query.category == "movies"){
			let quotes_list = [];
        
        (async () => {
    
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
                try {
           // var startTime = performance.now()
            console.log('https://www.quodb.com/search/' + req.query.type + '?advance-search=false&keywords=' + req.query.type);
            await page.goto('https://www.quodb.com/search/' + req.query.type + '?advance-search=false&keywords=' + req.query.type, {timeout: 18000000});
            let bodyHTML = await page.evaluate(() => document.body.innerHTML);
           // var endTime = performance.now();
          //  console.log(endTime-startTime)
            let $ = cheerio.load(bodyHTML);
            let label = $('.movie_thumb'); 
            let output = label.find('a').text();
            
            $('.phrase').each((index, element) => {
                const captions = $(element).text();
                quotes_list.push({
                    'captions': captions
                })
            });

            }  catch(err) {
                    console.log(err);
            }

        await browser.close();
        console.log(quotes_list)
        res.send(quotes_list);	
        })();
		}
	}

	if (req.query.type != null) {
	
		
	}
});

app.listen(3000);