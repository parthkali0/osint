import requests
import concurrent.futures
from fake_useragent import UserAgent


def check_single_platform(platform_data):
    """
    Helper function to check a single platform.
    """
    ua = UserAgent()
    headers = {'User-Agent': ua.random}

    name = platform_data['name']
    url = platform_data['url']
    check_type = platform_data['check']
    error_text = platform_data.get('error_text')

    result = {
        "platform": name,
        "url": url,
        "exists": False,
        "status_code": 0
    }

    try:
        # Use simple GET with timeout
        # Some sites need specific headers or they block scraping
        response = requests.get(url, headers=headers,
                                timeout=5, allow_redirects=True)

        result["status_code"] = response.status_code

        if check_type == "status_404":
            if response.status_code == 200:
                result["exists"] = True
        elif check_type == "content_text":
            if response.status_code == 200:
                text_lower = response.text.lower()
                if error_text and error_text.lower() in text_lower:
                    result["exists"] = False
                else:
                    result["exists"] = True

    except Exception:
        pass

    return result


def check_social_usernames(username):
    """
    Checks username availability across 15+ platforms concurrently.
    """
    platforms = [
        {"name": "GitHub", "url": f"https://github.com/{username}", "check": "status_404"},
        {"name": "Twitter/X", "url": f"https://twitter.com/{username}",
            "check": "status_404"},  # Hard checking without API
        {"name": "Instagram", "url": f"https://www.instagram.com/{username}/",
            "check": "status_404"},
        {"name": "Reddit", "url": f"https://www.reddit.com/user/{username}/",
            "check": "content_text", "error_text": "nobody on Reddit goes by that name"},
        {"name": "YouTube", "url": f"https://www.youtube.com/@{username}",
            "check": "status_404"},
        {"name": "Facebook", "url": f"https://www.facebook.com/{username}",
            "check": "status_404"},
        {"name": "Twitch", "url": f"https://www.twitch.tv/{username}",
            "check": "status_404"},
        {"name": "Medium", "url": f"https://medium.com/@{username}",
            "check": "status_404"},
        {"name": "Vimeo", "url": f"https://vimeo.com/{username}", "check": "status_404"},
        {"name": "SoundCloud", "url": f"https://soundcloud.com/{username}",
            "check": "status_404"},
        {"name": "Pinterest", "url": f"https://www.pinterest.com/{username}/",
            "check": "status_404"},
        {"name": "Dev.to", "url": f"https://dev.to/{username}", "check": "status_404"},
        {"name": "Steam", "url": f"https://steamcommunity.com/id/{username}",
            "check": "content_text", "error_text": "The specified profile could not be found"},
        {"name": "Tumblr", "url": f"https://{username}.tumblr.com", "check": "status_404"},
        {"name": "BitBucket", "url": f"https://bitbucket.org/{username}/",
            "check": "status_404"},
        {"name": "Patreon", "url": f"https://www.patreon.com/{username}",
            "check": "status_404"},
        {"name": "About.me", "url": f"https://about.me/{username}", "check": "status_404"}
    ]

    results = []

    # Use ThreadPool to make it fast
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_platform = {executor.submit(
            check_single_platform, p): p for p in platforms}
        for future in concurrent.futures.as_completed(future_to_platform):
            try:
                data = future.result()
                results.append(data)
            except Exception:
                pass

    return results
