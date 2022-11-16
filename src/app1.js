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

const request = require('request-promise');
//const cheerio = require('cheerio');
//const express = require('express');
//const app = express();

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
	
		  const songURL = ('https://www.lyrics.com/lyrics/' + req.query.type);
          const response = await request ({
            uri: songURL,
            headers: {
                'Accept':
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.lyrics.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            gzip: true
            
        });

   		  try {

			let $ = cheerio.load(response);
            
            let label = $('.lyric-meta-title'); 
            console.log(label);
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

      
      console.log(lyrics_list)
      res.send(lyrics_list);	
	  })();
		}



        if (req.query.category == "puns"){
			let puns_list = [];
		
		(async () => {
	
		  const punsURL = ('https://puns.samueltaylor.org/?word=' + req.query.type);
          let response = await request(punsURL);

          try {

			let $ = cheerio.load(response);
            
            let label = $('.puns'); 
	        let output = label.find('li').text();

			$('#puns-list').each((index, element) => {
				const captions = $(element).text();
				puns_list.push({
					'captions': captions
				})
			});

     	 }  catch(err) {
          		console.log(err);
      	 }

      
      console.log(puns_list)
      res.send(puns_list);	
	  })();
		}





        else if (req.query.category == "people"){
			let people_list = [];
		
		(async () => {
	
		  const peopleURL = ('https://www.quotes.net/quotations/' + req.query.type);
          const response = await request ({
            uri: peopleURL,
            headers: {
                'Accept':
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.quotes.net',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            gzip: true
            
        });

   		  try {

			let $ = cheerio.load(response);
            let label = $('.tal qx'); 
            console.log(label);
	        let output = label.find('a').text();

			$('.author-quote').each((index, element) => {
				const captions = $(element).text();
				people_list.push({
					'captions': captions
				})
			});

     	 }  catch(err) {
          		console.log(err);
      	 }

      
      console.log(people_list)
      res.send(people_list);	
	  })();
		}


    
        else if (req.query.category == "movies"){
			let quotes_list = [];
		
		(async () => {
	
		  let movieURL = ('https://www.moviequotes.com/search-quotes/?q=' + req.query.type);
          let response = await request(movieURL);
        

            
            


   		  try {

            let $ = cheerio.load(response);
            let label = $('[class=\"post-box\"]');
            let output = label.find('span').text();
            

			$('[class=\"whole-read-more\"]').each((index, element) => {
				const captions = $(element).text();
				quotes_list.push({
					'captions': captions
				})
			});




     	 }  catch(err) {
          		console.log(err);
      	 }

      
        console.log(quotes_list)
        res.send(quotes_list);		
	  })();
		}




        if (req.query.type != null) {
	
		
        }




    }






});











app.listen(3000);