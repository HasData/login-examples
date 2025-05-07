import requests
from bs4 import BeautifulSoup

login_url     = "URL"
protected_url = "protected_URL"

session = requests.Session()

resp = session.get(login_url)
resp.raise_for_status()

soup = BeautifulSoup(resp.text, 'html.parser')
csrf_token = soup.select_one("input[name='_token']")['value']

payload = {
    'email':    'admin@example.com',
    'password': 'password',
    '_token':   csrf_token
}
post_resp = session.post(login_url, data=payload)
post_resp.raise_for_status()

protected = session.get(protected_url)
protected.raise_for_status()

soup2 = BeautifulSoup(protected.text, 'html.parser')
print(soup2.prettify()) 
