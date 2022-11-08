const express = require('express');
const app = express();

const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

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
   		
			await page.goto('https://www.lyrics.com/lyrics/' + req.query.type, {timeout: 180000});
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
            console.log('https://www.quodb.com/search/' + req.query.type + '?advance-search=false&keywords=' + req.query.type);
            await page.goto('https://www.quodb.com/search/' + req.query.type + '?advance-search=false&keywords=' + req.query.type, {timeout: 180000});
            let bodyHTML = await page.evaluate(() => document.body.innerHTML);
            
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