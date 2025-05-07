import requests

login_url = "URL"

payload = {
    'username': 'your_username',
    'password': 'your_password'
}

response = requests.post(login_url, data=payload)

if response.status_code == 200:
    print("Login successful!")
else:
    print(f"Login failed with status code {response.status_code}")
