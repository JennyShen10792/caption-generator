
/*
//const cheerio = require('cheerio');

//const puppeteer = require('puppeteer');

let lyrics_list = [];

const user_keyword = document.getElementById("filterWord").value;


function keyword_input() {

    (async () => {
   //   const browser = await puppeteer.launch();
   //   const page = await browser.newPage();
    	filterWord = document.getElementById("filterWord").value; 
        try {
        console.log(filterWord);
          await page.goto('https://www.lyrics.com/lyrics/' + filterWord, {timeout: 180000});
          await page.waitForSelector("#search");
          await page.type("#search", user_keyword);
          await page.click("#page-word-search-button", {timeout: 180000});
          await page.waitForSelector("pre.lyric-body");
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    let $ = cheerio.load(bodyHTML);
    let label = $('.lyric-meta-title'); 
    let output = label.find('pre').text();
    
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
    })();
    
}
*/

const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

let lyrics_list = [];
function keyword_input() {
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
filterWord = document.getElementById("filterWord").value;
    try {
await page.goto('https://www.lyrics.com/lyrics/' + filterWord, {timeout: 180000});
let bodyHTML = await page.evaluate(() => document.body.innerHTML);
let $ = cheerio.load(bodyHTML);
let label = $('.lyric-meta-title'); 
let output = label.find('pre').text();

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
})();
}
