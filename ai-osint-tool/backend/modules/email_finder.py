import re


def find_emails(target, search_results):
    """
    Extracts emails from search result snippets.
    Detailed scraping of full pages is avoided for speed and ethics.
    """
    emails = set()
    regex = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

    # Check if target itself is a domain, try to form generic emails
    if '.' in target:
        common_prefixes = ['info', 'contact', 'support', 'sales', 'admin']
        # We don't Verify these, just list as potential
        # But for 'found' check, we rely on search results
        pass

    for result in search_results:
        text = str(result.get('snippet', '')) + \
            " " + str(result.get('title', ''))
        found = re.findall(regex, text)
        for email in found:
            emails.add(email)

    return list(emails)
