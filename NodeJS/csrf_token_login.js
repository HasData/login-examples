const axios    = require('axios');
const cheerio  = require('cheerio');

(async () => {
  const loginUrl     = 'URL';
  const protectedUrl = 'protected_URL';

  const getResp = await axios.get(loginUrl, { withCredentials: true });
  const $       = cheerio.load(getResp.data);
  const csrf    = $('input[name="_token"]').attr('value');

  const payload = new URLSearchParams({
    email:    'admin@example.com',
    password: 'password',
    _token:   csrf
  });
  await axios.post(loginUrl, payload.toString(), {
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  });

  const protectedResp = await axios.get(protectedUrl, { withCredentials: true });

  const $$ = cheerio.load(protectedResp.data);
  console.log($$('div.dashboard').text().trim());
})();
