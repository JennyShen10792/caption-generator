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
	if (req.query.type != null) {
		console.log("abs");
		let lyrics_list = [];
		
		(async () => {
		console.log("hi");
		  const browser = await puppeteer.launch();
		  const page = await browser.newPage();
   		  try {
   			console.log("hello");
			await page.goto('https://www.lyrics.com/lyrics/' + req.query.type, {timeout: 180000});
			let bodyHTML = await page.evaluate(() => document.body.innerHTML);
			console.log(bodyHTML);
			let $ = cheerio.load(bodyHTML);
			let label = $('.lyric-meta-title'); 
			let output = label.find('pre').text();
			console.log(output);
			$('.lyric-body').each((index, element) => {
				const lyrics = $(element).text();
				lyrics_list.push({
					'lyrics': lyrics
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
});
app.listen(3000);
