const axios = require('axios');

const loginUrl = 'URL';

axios.get(loginUrl, {
  auth: {
    username: 'your_username',
    password: 'your_password',
  }
})
  .then(response => {
    console.log("Login successful!");
  })
  .catch(error => {
    console.error(`Login failed with status code: ${error.response.status}`);
  });
