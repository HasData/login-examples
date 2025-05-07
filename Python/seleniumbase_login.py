from seleniumbase import SB

login_url = "URL"
username = "your_username"
password = "your_password"

with SB(uc=True, test=True) as sb:
    sb.open(login_url)

    sb.type('input[name="username"]', username)
    sb.type('input[name="password"]', password)

    sb.click('button[type="submit"]')

    sb.assert_element("div.any-element")

    print("Logged in successfully!")
