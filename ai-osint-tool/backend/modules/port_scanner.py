import socket


def scan_ports(target):
    """
    Scans top common ports.
    """
    # Ethical constraint: scan only top common ports
    ports = [21, 22, 23, 25, 53, 80, 110,
             143, 443, 445, 3306, 3389, 5432, 8080]
    open_ports = []

    ip = target
    try:
        if any(c.isalpha() for c in target):
            ip = socket.gethostbyname(target)
    except:
        return {"error": "Could not resolve host"}

    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.5)
        result = sock.connect_ex((ip, port))
        if result == 0:
            open_ports.append(port)
        sock.close()

    return {"open_ports": open_ports, "scanned_ports": ports}
