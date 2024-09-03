const puppeteer = require('puppeteer');

document.getElementById('botao').addEventListener('click', function() {
  const link = document.getElementById('link').value;
  const firstSlashIndex = link.indexOf('/');
  const extractedLink = link.substring(firstSlashIndex);

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com${extractedLink}`);
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})});