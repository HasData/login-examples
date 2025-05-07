import requests

login_url = "URL"

response = requests.get(login_url, auth=("your_username", "your_password"))

if response.status_code == 200:
    print("Login successful!")
else:
    print(f"Login failed with status code {response.status_code}")
