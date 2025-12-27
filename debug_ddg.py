import requests
from fake_useragent import UserAgent

ua = UserAgent()
headers = {'User-Agent': ua.random}
url = "https://duckduckgo.com/html/?q=google"

try:
    print(f"Fetching {url}...")
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Status Code: {response.status_code}")
    print("Page preview (first 1000 chars):")
    print(response.text[:1000])

    # Check for 'result' class
    if 'class="result' in response.text:
        print("FOUND class='result'")
    else:
        print("NOT FOUND class='result'")

    # Check for links
    if 'class="result__a"' in response.text:
        print("FOUND class='result__a'")
    else:
        print("NOT FOUND class='result__a'")

except Exception as e:
    print(f"Error: {e}")
