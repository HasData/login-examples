![Python](https://img.shields.io/badge/python-3.10+-blue)
![Node.js](https://img.shields.io/badge/node.js-18+-green)

# Login Automation Examples (Python & Node.js)
[![HasData_bannner](banner.png)](https://hasdata.com/)

This repository contains practical login automation examples using **Python** and **Node.js**. It demonstrates how to handle different authentication flows: from basic form submissions to CSRF-protected logins and browser automation with Selenium, Puppeteer, SeleniumBase and Playwright.


## Table of Contents

1. [Requirements](#requirements)
2. [Project Structure](#project-structure)
3. [Login  Examples](#login-examples)
   - [Simple Login](#simple-login)
   - [CSRF Token Login](#csrf-token-login)
   - [Selenium/Puppeteer Login](#seleniumpuppeteer-login)
   - [SeleniumBase/Playwright Login](#seleniumbaseplaywright-login)
   - [Session Persistence](#session-persistence)
   - [Cookie Handling](#cookie-handling)
4. [Disclaimer](#disclaimer)


## Requirements

**Python 3.10+** or **Node.js 18+**

### Python Setup

Required packages include:

* `requests`
* `beautifulsoup4`
* `selenium`
* `seleniumbase`

Command: 

```bash
pip install requests beautifulsoup4 selenium seleniumbase
```

### Node.js Setup


Includes:

* `axios`
* `puppeteer`
* `playwright`

Command:

```bash
npm install axios puppeteer playwright
```

## Project Structure

```
login-examples/
│
├── python/
│   ├── simple_login_get.py
│   ├── simple_login_post.py
│   ├── csrf_token_login.py
│   ├── selenium_login.py
│   ├── seleniumbase_login.py      
│   ├── session_persistence.py
│   ├── cookie_handling.py
│
├── nodejs/
│   ├── simple_login.js
│   ├── simple_login_post.js
│   ├── csrf_token_login.js
│   ├── puppeteer_login.js
│   ├── playwright_login.js         
│   ├── session_persistence.js
│   ├── cookie_handling.js
│
└── README.md
```

Each script is self-contained and targets a different type of login logic.

##  Login Examples

Replace `URL`, `username`, and `password` with your actual values before running.

### Simple Login

Demonstrates a simple POST/GET login using email and password. This method works by sending the credentials directly via a POST/GET request.

| Description             | Python                                           | Node.js                                                                 |
| ----------------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| **Authenticate (POST)** | `requests.post(login_url, data=payload)`         | `axios.post(loginUrl, payload)`                                         |
| **Authenticate (GET)**  | `requests.get(login_url, auth=('user', 'pass'))` | `axios.get(loginUrl, { auth: { username: 'user', password: 'pass' } })` |


### CSRF Token Login

Shows how to handle CSRF tokens during login. It extracts the CSRF token from the page and includes it in the login request for protection against CSRF attacks.


| Description                  | Python                                                                                    | Node.js                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **GET login page**           | `resp = session.get(login_url)`<br>`resp.raise_for_status()`                              | `const getResp = await axios.get(loginUrl, { withCredentials: true });`                                                                        |
| **Extract CSRF token**       | `csrf_token = soup.select_one("input[name='_token']")['value']`                           | `const $ = cheerio.load(getResp.data);`<br>`const csrf = $('input[name="_token"]').attr('value');`                                             |
| **POST credentials + token** | `session.post(login_url, data=payload)`<br>`post_resp.raise_for_status()`                 | `await axios.post(loginUrl, payload.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true });` |
| **GET protected page**       | `protected = session.get(protected_url)`<br>`protected.raise_for_status()`                | `const protectedResp = await axios.get(protectedUrl, { withCredentials: true });`                                                              |


### Selenium/Puppeteer Login

Uses **Selenium** to automate login by interacting with the page and filling in the login form (useful for sites that require interaction with JavaScript elements or CAPTCHAs).


| Description        | Python                                                            | Node.js                                                       |
| ------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| **Init browser**   | `driver = webdriver.Chrome(...)`                                  | `const browser = await puppeteer.launch({ headless: true });` |
| **Go to page**     | `driver.get("URL")`                             | `await page.goto("URL")`                    |
| **Enter login**    | `driver.find_element(...,"email").send_keys("admin@example.com")` | `await page.type('input[name="email"]','admin@example.com')`  |
| **Enter password** | `driver.find_element(...,"password").send_keys("password")`       | `await page.type('input[name="password"]','password')`        |
| **Submit form**    | `driver.find_element(...,'button[type=\"submit\"]').click()`      | `await page.click('button[type=\"submit\"]')`                 |


### SeleniumBase/Playwright Login

An advanced version of Selenium, **SeleniumBase**, is used for browser automation. It simplifies Selenium operations, making it easier to write tests and automation scripts.

| Description            | Python        | Node.js                        |
| ------------------------ | --------------------------------------------- | ---------------------------------------------------------- |
| **Open login page**      | `sb.open(login_url)`                          | `await page.goto(login_url, { waitUntil: 'networkidle' })` |
| **Fill username**        | `sb.type('input[name="username"]', username)` | `await page.fill('input[name="username"]', username)`      |
| **Fill password**        | `sb.type('input[name="password"]', password)` | `await page.fill('input[name="password"]', password)`      |
| **Submit form**          | `sb.click('button[type="submit"]')`           | `await page.click('button[type="submit"]')`                |


### Session Persistence

This example shows how to maintain session state across multiple requests, preserving cookies and authentication tokens after login.


| Description             | Python                                                                   | Node.js                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Create session**      | `session = requests.Session()`                                           | `const jar = new tough.CookieJar();`<br>`const client = wrapper(axios.create({ jar, withCredentials: true }));` |
| **Authenticate (POST)** | `login_resp = session.post("URL", data=payload)` | `client.post("URL", payload)`                                                                   |
| **Access protected**    | `dash_resp = session.get("protected_URL")`         | `client.get("protected_URL")`                                                                     |


### Cookie Handling

Demonstrates how to handle cookies during login. This is useful for keeping the session alive across requests or saving cookies for future use.

| Description            | Python                                                    | Node.js                                                                                                 |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Save Cookies**       | `import pickle` <br> `pickle.dump(session.cookies, f)`    | `const fs = require('fs');` <br> `fs.writeFileSync(COOKIE_FILE, JSON.stringify(await jar.serialize()))` |
| **Load Cookies**       | `pickle.load(f)`                                          | `const data = fs.readFileSync(COOKIE_FILE);` <br> `await jar.deserialize(data)`                         |
| **Save Cookies File**  | `pickle.dump(session.cookies, open('cookies.pkl', 'wb'))` | `fs.writeFileSync('cookies.json', JSON.stringify(await jar.serialize()))`                               |
| **Reuse Cookies File** | `load_cookies(session, 'cookies.pkl')`                    | `await loadCookies()`                                                                                   |



## Disclaimer

These examples are for **educational purposes** only. Learn more about [the legality of web scraping]("https://hasdata.com/blog/is-web-scraping-legal").





