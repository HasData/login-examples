const { chromium } = require('playwright');

(async () => {
  const login_url = 'URL';
  const username = 'your_username';
  const password = 'your_password';

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(login_url, { waitUntil: 'networkidle' });

  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]');

  await page.waitForSelector('div.any-element');

  console.log('Logged in successfully!');

  await browser.close();
})();
