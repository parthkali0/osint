import requests
import socket


def get_ip_info(target):
    """
    Resolves target to IP and fetches geolocation.
    """
    try:
        # Resolve domain to IP if needed
        ip = target
        if any(c.isalpha() for c in target):
            ip = socket.gethostbyname(target)

        url = f"http://ip-api.com/json/{ip}"
        response = requests.get(url, timeout=5)
        return response.json()
    except Exception as e:
        return {"error": str(e), "target": target}
