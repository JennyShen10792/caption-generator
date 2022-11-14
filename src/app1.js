const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

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


    
        else if (req.query.category == "movies"){
			let quotes_list = [];
		
		(async () => {
	
		  const movieURL = ('https://www.quodb.com/search/' + req.query.type + '?advance-search=false&keywords=' + req.query.type);
          console.log(movieURL);
          const response = await request ({
            uri: movieURL,
            headers: {
                'Accept':
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.quodb.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            gzip: true
            
        });

   		  try {
			let $ = cheerio.load(response);
            let label = $('.movie_thumb'); 
            let output = label.find('a').text();
            
            $('.phrase').each((index, element) => {
                const captions = $(element).text();
                quotes_list.push({
                    'captions': captions
                })
            });





            // let label = $('.phrase'); 
            // console.log(label);
            // let label2 = $("a.phrase > span");
            // console.log(label2);
            //let output = label.find('a');
            //console.log(output);
            //let quote_caption = output.find('span');
            //console.log(quote_caption);
            
            $(label2).each((index, element) => {
                const captions = $(element).text();
                console.log("hello");
                quotes_list.push({
                    'captions': captions
                })
            });




            // let label = $('.phrase'); 
            // let label2 = $("a.phrase > span").text();
            // console.log(label2);
            // let label1 = label.text();
            // console.log(label);
            // let output = label.find('span').text();
            //console.log(output);


			// $('.phrase').each((index, element) => {
            //     const captions = $(element).text();
            //     quotes_list.push({
            //         'captions': captions
            //     })
            // });

            // let $ = cheerio.load(response);
            // let captions = $('a[class="phrase"] > span').text();
            // console.log(captions);
            // 	quotes_list.push({
			// 		'captions': captions
			// 	})

            // let label = $('.table result_table'); 
            // let block = label.find('blockquote');
            // let quote = block.find('')
            // let output = label.find('').text();
            // console.log(output);
            // $('.phrase').each((index, element) => {
            //     const captions = $(element).text();
            //     console.log(captions);
            //     quotes_list.push({
            //         'captions': captions
            //     })
            // });


			// $('.lyric-body').each((index, element) => {
			// 	const captions = $(element).text();
			// 	lyrics_list.push({
			// 		'captions': captions
			// 	})
			// });





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