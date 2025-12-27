import whois
import dns.resolver
import socket


def get_domain_info(domain):
    info = {"whois": {}, "dns": []}

    # 1. WHOIS
    try:
        w = whois.whois(domain)
        info["whois"] = {
            "registrar": w.registrar,
            "creation_date": str(w.creation_date),
            "expiration_date": str(w.expiration_date),
            "emails": w.emails
        }
    except Exception as e:
        info["whois"] = {"error": str(e)}

    # 2. DNS
    record_types = ['A', 'MX', 'NS', 'TXT']
    for record in record_types:
        try:
            answers = dns.resolver.resolve(domain, record)
            for rdata in answers:
                info["dns"].append(f"{record}: {rdata.to_text()}")
        except Exception:
            pass

    return info
