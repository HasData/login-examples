const axios = require("axios");
const tough = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");

const jar = new tough.CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

const payload = {
  username: "your_username",
  password: "your_password",
};

client
  .post("URL", payload)
  .then(loginResp => {
    console.log("Logged in, status:", loginResp.status);
    return client.get("protected_URL");
  })
  .then(dashResp => {
    console.log("Dashboard content preview:");
    console.log(dashResp.data);
  })
  .catch(err => {
    console.error("Error:", err.message);
    process.exit(1);
  });
