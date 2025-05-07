const axios = require('axios');

const loginUrl = 'URL';

const payload = {
  username: 'your_username',
  password: 'your_password',
};

axios.post(loginUrl, payload)
  .then(response => {
    console.log("Login successful!");
  })
  .catch(error => {
    console.error(`Login failed with status code: ${error.response.status}`);
  });
