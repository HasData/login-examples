import requests

session = requests.Session()

payload = {
    "username": "your_username",
    "password": "your_password"
}
login_resp = session.post("URL", data=payload)
login_resp.raise_for_status()

print("Logged in, status:", login_resp.status_code)

dash_resp = session.get("protected_URL")
dash_resp.raise_for_status()

print("Dashboard content preview:")
print(dash_resp.text)
