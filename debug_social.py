import requests
from fake_useragent import UserAgent

ua = UserAgent()
headers = {'User-Agent': ua.random}

users = ["google", "thisuserdefinitelydoesnotexist123456"]
sites = [
    "https://github.com/",
    "https://www.instagram.com/",
    "https://twitter.com/",
    "https://www.reddit.com/user/"
]

for site in sites:
    for user in users:
        url = f"{site}{user}"
        if site == "https://www.instagram.com/" and not url.endswith('/'):
            url += '/'
        if site == "https://www.reddit.com/user/" and not url.endswith('/'):
            url += '/'

        try:
            print(f"Checking {url}...")
            r = requests.get(url, headers=headers,
                             timeout=10, allow_redirects=True)
            print(
                f"Status: {r.status_code}, Length: {len(r.text)}, URL: {r.url}")
            if "login" in r.url:
                print("Redirected to Login")
        except Exception as e:
            print(f"Error: {e}")
