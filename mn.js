const puppeteer = require('puppeteer');
const { mn } = require('./src/config/default');
const srcToImg = require('./src/helper/srcToimg');

(async () => {
  const browser = await puppeteer.launch({
    /*     headless: false, */
    /*     executablePath: './chromium/chrome.exe' */
  });
  const page = await browser.newPage();
  await page.goto('http://image.baidu.com');

  await page.setViewport({
    width: 1920,
    height: 1080
  });
  console.log('reset viewport');

  await page.focus('#kw');
  await page.keyboard.sendCharacter('狗');
  await page.keyboard.press("Enter");
  console.log('go to search list');

  page.on('load', async () => {
    console.log('page loading done,start fetch..');
    const srcs = await page.evaluate(() => {
      const images = document.querySelectorAll('img.main_img');
      return Array.prototype.map.call(images, img => img.src);
    });
    console.log(`get ${srcs.length} images,start download`);
    srcs.forEach(async (src) => {
      //sleep 降低频次，避免反爬虫
      await page.waitFor(200);
      await srcToImg(src, mn);
    });
    browser.close();
  });

})();