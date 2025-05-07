import requests
import pickle
import os

LOGIN_URL = "URL"
PROTECTED_URL = "protected_URL"
COOKIE_FILE = "cookies.pkl"

def save_cookies(session, filename):
    with open(filename, "wb") as f:
        pickle.dump(session.cookies, f)

def load_cookies(session, filename):
    with open(filename, "rb") as f:
        session.cookies.update(pickle.load(f))

def login_and_save():
    session = requests.Session()
    payload = {"username": "your_username", "password": "your_password"}
    resp = session.post(LOGIN_URL, data=payload)
    resp.raise_for_status()
    print("Logged in, status:", resp.status_code)

    save_cookies(session, COOKIE_FILE)
    print(f"Cookies saved to {COOKIE_FILE}")

    dashboard = session.get(PROTECTED_URL)
    print("Protected page title snippet:", dashboard.text[:200])

def reuse_cookies():
    session = requests.Session()
    load_cookies(session, COOKIE_FILE)
    print(f"Loaded cookies from {COOKIE_FILE}")

    dashboard = session.get(PROTECTED_URL)
    print("Protected page title snippet:", dashboard.text[:200])

if __name__ == "__main__":
    if not os.path.exists(COOKIE_FILE):
        login_and_save()
    else:
        reuse_cookies()
