def analyze_target(data):
    """
    Performs heuristic analysis on the gathered data to generate insights.
    Offline AI logic (Rule-based Expert System).
    """
    analysis = {
        "risk_score": 0,
        "risk_level": "LOW",
        "insights": []
    }

    score = 0

    # 1. Open Ports Risks
    ports = data['modules'].get('ports', {}).get('open_ports', [])
    if 21 in ports:  # FTP
        score += 20
        analysis['insights'].append(
            "FTP (Port 21) is open. Ensure strictly secured or disable.")
    if 23 in ports:  # Telnet
        score += 30
        analysis['insights'].append(
            "Telnet (Port 23) is open. CRITICAL: Use SSH instead.")
    if 3389 in ports:  # RDP
        score += 15
        analysis['insights'].append(
            "RDP (Port 3389) exposed. Vulnerable to potential brute force.")

    # 2. Email Exposure
    emails = data['modules'].get('emails', [])
    if len(emails) > 0:
        score += 10
        analysis['insights'].append(
            f"Found {len(emails)} public email addresses. Phishing risk increased.")

    # 3. Domain Info
    domain_info = data['modules'].get('domain', {})
    if 'whois' in domain_info:
        creation = domain_info['whois'].get('creation_date', '')
        # Simple string check for '2025' or recent year might indicate new domain
        if '2025' in str(creation) or '2024' in str(creation):
            score += 5
            analysis['insights'].append("Domain is relatively new.")

    # 4. Social Footprint
    socials = data['modules'].get('social', [])
    found_socials = [s for s in socials if s.get('found')]
    if len(found_socials) > 5:
        analysis['insights'].append(
            "High social media footprint detected. Identity correlation easy.")
    elif len(found_socials) == 0 and ' ' not in data.get('target', ''):
        analysis['insights'].append(
            "Low social media visibility or target is not a username.")

    # Normalize Score
    if score > 80:
        analysis['risk_level'] = "CRITICAL"
    elif score > 50:
        analysis['risk_level'] = "HIGH"
    elif score > 20:
        analysis['risk_level'] = "MEDIUM"
    else:
        analysis['risk_level'] = "LOW"

    analysis['risk_score'] = min(score, 100)

    return analysis
