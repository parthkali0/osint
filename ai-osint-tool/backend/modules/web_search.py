import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import urllib.parse
import hashlib


def search_duckduckgo(query, num_results=10):
    """
    Scrapes DuckDuckGo HTML for search results with deduplication.
    Ref: https://duckduckgo.com/html/
    """
    ua = UserAgent()
    headers = {'User-Agent': ua.random}
    url = f"https://duckduckgo.com/html/?q={urllib.parse.quote(query)}"

    try:
        response = requests.get(url, headers=headers,
                                timeout=15)  # Increased timeout

        if response.status_code != 200:
            return [{"error": f"Search provider returned status {response.status_code}"}]

        soup = BeautifulSoup(response.text, 'html.parser')

        results = []
        seen_hashes = set()

        result_divs = soup.find_all('div', class_='result')

        if not result_divs:
            return [{"title": "No text results found", "link": "#", "snippet": "Try a different query or check internet connection."}]

        for result in result_divs:
            try:
                title_tag = result.find('a', class_='result__a')
                if not title_tag:
                    continue

                link = title_tag['href']
                title = title_tag.get_text(strip=True)

                snippet_tag = result.find('a', class_='result__snippet')
                snippet = snippet_tag.get_text(
                    strip=True) if snippet_tag else "No description available."

                # Deduplication logic
                content_hash = hashlib.md5(
                    f"{link}{title}".encode('utf-8')).hexdigest()
                if content_hash in seen_hashes:
                    continue
                seen_hashes.add(content_hash)

                results.append({
                    "title": title,
                    "link": link,
                    "snippet": snippet,
                    "domain": urllib.parse.urlparse(link).netloc
                })
                if len(results) >= num_results:
                    break
            except Exception:
                continue

        return results
    except Exception as e:
        return [{"error": f"Search failed: {str(e)}"}]
