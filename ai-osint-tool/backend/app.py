from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from modules.web_search import search_duckduckgo
from modules.domain_lookup import get_domain_info
from modules.social_media import check_social_usernames
from modules.email_finder import find_emails
from modules.ip_geolocation import get_ip_info
from modules.port_scanner import scan_ports
from modules.ai_analysis import analyze_target

app = Flask(__name__)
CORS(app)


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "pulse_active", "system": "ONLINE"})


@app.route('/api/scan', methods=['POST'])
def scan_target():
    data = request.json
    target = data.get('target', '')
    scan_type = data.get('type', 'full')

    if not target:
        return jsonify({"error": "No target specified"}), 400

    results = {
        "target": target,
        "timestamp": time.time(),
        "modules": {}
    }

    # Execute modules based on simple logic (in a real app, this would be async/threaded)
    # For this demo, we run them sequentially but they are fast enough for small steps

    try:
        # 1. IP / Geolocation
        results['modules']['ip_geo'] = get_ip_info(target)

        # 2. Domain Info (if applicable)
        if '.' in target and not target.replace('.', '').isdigit():
            results['modules']['domain'] = get_domain_info(target)

        # 3. Web Search
        results['modules']['web_search'] = search_duckduckgo(target)

        # 4. Social Media (if target looks like a username or handle, or just try generic)
        # We'll treat target as a potential username if it's a single word
        if ' ' not in target and '.' not in target:
            results['modules']['social'] = check_social_usernames(target)

        # 5. Email Finder (mock/simple regex on search results)
        results['modules']['emails'] = find_emails(
            target, results['modules'].get('web_search', []))

        # 6. Port Scanner (only if IP or Domain)
        if '.' in target:
            results['modules']['ports'] = scan_ports(target)

        # 7. AI Analysis
        results['analysis'] = analyze_target(results)

    except Exception as e:
        return jsonify({"error": str(e), "status": "SCAN_FAILED"}), 500

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
