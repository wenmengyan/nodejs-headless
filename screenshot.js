const puppeteer = require('puppeteer');
const { screenshot } = require('./src/config/default');


(async () => {
  const browser = await puppeteer.launch({
    /*  headless: false, */
    /*     executablePath: './chromium/chrome.exe' */
  });
  const page = await browser.newPage();
  await page.goto('http://www.baidu.com');
  await page.screenshot({ path: `${screenshot}/${Date.now()}.png` });
  browser.close();
})();