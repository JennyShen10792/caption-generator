const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

let scraped_headlines = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

    try {
await page.goto('https://www.lyrics.com/lyrics/heart', {timeout: 180000});
let bodyHTML = await page.evaluate(() => document.body.innerHTML);
let $ = cheerio.load(bodyHTML);
let article_headlines = $('.lyric-meta-title'); 
let output = article_headlines.find('pre').text();

$('.lyric-body').each((index, element) => {
const title = $(element).text();
scraped_headlines.push({
'lyrics': title
})
});

      }  catch(err) {
          console.log(err);
      }

      await browser.close();
    console.log(scraped_headlines)
})();