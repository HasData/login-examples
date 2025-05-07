const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('URL', { waitUntil: 'networkidle2' });

  await page.type('input[name="email"]', 'admin@example.com');
  await page.type('input[name="password"]', 'password');

  await page.click('button[type="submit"]');

  await browser.close();
})();
