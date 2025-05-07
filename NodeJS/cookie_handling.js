const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const fs = require('fs');

const LOGIN_URL = 'URL';
const PROTECTED_URL = 'protected_URL';
const COOKIE_FILE = 'cookies.json';

const jar = new tough.CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

async function saveCookies() {
  const serialized = await jar.serialize();
  fs.writeFileSync(COOKIE_FILE, JSON.stringify(serialized));
  console.log(`Cookies saved to ${COOKIE_FILE}`);
}

async function loadCookies() {
  if (!fs.existsSync(COOKIE_FILE)) return false;
  const data = JSON.parse(fs.readFileSync(COOKIE_FILE));
  await jar.deserialize(data);
  console.log(`Loaded cookies from ${COOKIE_FILE}`);
  return true;
}

async function loginAndSave() {
  const resp = await client.post(LOGIN_URL, {
    username: 'your_username',
    password: 'your_password'
  });
  console.log('Logged in, status:', resp.status);

  await saveCookies();

  const dash = await client.get(PROTECTED_URL);
  console.log('Protected page snippet:', dash.data.slice(0, 200));
}

async function reuseCookies() {
  const loaded = await loadCookies();
  if (!loaded) {
    console.log('No cookies found, please run login first.');
    return;
  }
  const dash = await client.get(PROTECTED_URL);
  console.log('Protected page snippet:', dash.data.slice(0, 200));
}

(async () => {
  if (!fs.existsSync(COOKIE_FILE)) {
    await loginAndSave();
  } else {
    await reuseCookies();
  }
})();
