const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

let lyrics_list = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

    try {
      await page.goto('https://www.lyrics.com/lyrics/', {timeout: 180000});
      await page.waitForSelector("#search");
      await page.type("#search", "heart");
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