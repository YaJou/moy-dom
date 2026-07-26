#!/usr/bin/env python3
"""One-shot audit for dom-krovservice64.ru"""
from __future__ import annotations

import json
import re
import socket
import ssl
import subprocess
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

HOST = "dom-krovservice64.ru"
BASE = f"https://{HOST}"
UA = {"User-Agent": "SEO-Security-Audit/1.0", "Accept-Encoding": "gzip, deflate, br"}


def fetch(url: str, method: str = "GET"):
    req = urllib.request.Request(url, method=method, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            raw = r.read() if method != "HEAD" else b""
            enc = (r.headers.get("Content-Encoding") or "").lower()
            body = raw
            if method != "HEAD" and enc == "gzip":
                import gzip

                body = gzip.decompress(raw)
            elif method != "HEAD" and enc == "br":
                try:
                    import brotli

                    body = brotli.decompress(raw)
                except Exception:
                    body = raw
            return r.status, {k.lower(): v for k, v in r.headers.items()}, body, r.geturl()
    except Exception as e:
        return getattr(e, "code", 0) or 0, {}, b"", str(e)


def tls_info():
    ctx = ssl.create_default_context()
    with socket.create_connection((HOST, 443), timeout=15) as sock:
        with ctx.wrap_socket(sock, server_hostname=HOST) as ssock:
            cert = ssock.getpeercert()
            ver = ssock.version()
            cipher = ssock.cipher()
            # try get peercert chain
            try:
                der_certs = ssock.getpeercert(binary_form=True)
            except Exception:
                der_certs = None
    subject = dict(x[0] for x in cert.get("subject", ()))
    issuer = dict(x[0] for x in cert.get("issuer", ()))
    na = cert.get("notAfter")
    exp = datetime.strptime(na, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
    days = (exp - datetime.now(timezone.utc)).days
    sans = [v for t, v in cert.get("subjectAltName", ()) if t == "DNS"]
    return {
        "version": ver,
        "cipher": cipher,
        "subject": subject,
        "issuer": issuer,
        "notBefore": cert.get("notBefore"),
        "notAfter": na,
        "days_left": days,
        "sans": sans,
        "self_signed": subject.get("commonName") == issuer.get("commonName")
        and subject.get("organizationName") == issuer.get("organizationName"),
    }


def nslookup(qtype: str, name: str = HOST) -> list[str]:
    try:
        out = subprocess.check_output(
            ["nslookup", f"-type={qtype}", name],
            text=True,
            stderr=subprocess.STDOUT,
            timeout=15,
            encoding="utf-8",
            errors="replace",
        )
        return [ln.strip() for ln in out.splitlines() if ln.strip()]
    except Exception as e:
        return [f"ERR {e}"]


class PageSEO(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.metas = []
        self.canonical = None
        self.h1s = []
        self.in_h1 = False
        self.h1_buf = []
        self.imgs = []
        self.links = []
        self.scripts_ld = []
        self.in_ld = False
        self.ld_buf = []
        self.lang = None
        self.blank_links = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            self.metas.append(a)
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        if tag == "h1":
            self.in_h1 = True
            self.h1_buf = []
        if tag == "img":
            self.imgs.append(a)
        if tag == "a":
            href = a.get("href")
            if href:
                self.links.append(href)
            if a.get("target") == "_blank":
                self.blank_links.append(a)
        if tag == "script" and a.get("type") == "application/ld+json":
            self.in_ld = True
            self.ld_buf = []

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "h1" and self.in_h1:
            self.in_h1 = False
            self.h1s.append("".join(self.h1_buf).strip())
        if tag == "script" and self.in_ld:
            self.in_ld = False
            self.scripts_ld.append("".join(self.ld_buf))

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_h1:
            self.h1_buf.append(data)
        if self.in_ld:
            self.ld_buf.append(data)

    def meta(self, *, name=None, prop=None):
        for m in self.metas:
            if name and m.get("name", "").lower() == name.lower():
                return m.get("content")
            if prop and m.get("property", "").lower() == prop.lower():
                return m.get("content")
        return None


def analyze_page(url: str):
    status, headers, body, final = fetch(url)
    html = body.decode("utf-8", errors="replace")
    p = PageSEO()
    p.feed(html)
    http_res = re.findall(r"""(?:src|href|content)=["'](http://[^"']+)""", html, re.I)
    noalt = [i for i in p.imgs if "alt" not in i]
    bad_blank = [
        a
        for a in p.blank_links
        if "noopener" not in (a.get("rel") or "").lower()
    ]
    ld_types = []
    for block in p.scripts_ld:
        try:
            data = json.loads(block)
            ld_types.append(data.get("@type") if isinstance(data, dict) else "list")
        except Exception:
            ld_types.append("invalid")
    return {
        "url": url,
        "status": status,
        "final": final,
        "title": p.title.strip(),
        "title_len": len(p.title.strip()),
        "description": p.meta(name="description"),
        "desc_len": len(p.meta(name="description") or ""),
        "robots": p.meta(name="robots"),
        "canonical": p.canonical,
        "h1_count": len(p.h1s),
        "h1s": p.h1s[:3],
        "lang": p.lang,
        "viewport": p.meta(name="viewport"),
        "charset_ok": bool(re.search(r"charset=[\"']?utf-8", html, re.I)),
        "og_title": p.meta(prop="og:title"),
        "og_description": p.meta(prop="og:description"),
        "og_image": p.meta(prop="og:image"),
        "twitter_card": p.meta(name="twitter:card"),
        "jsonld_types": ld_types,
        "imgs": len(p.imgs),
        "imgs_no_alt": len(noalt),
        "blank_total": len(p.blank_links),
        "blank_no_noopener": len(bad_blank),
        "mixed_http": http_res[:15],
        "internal_links": [
            urljoin(url, h)
            for h in p.links
            if h.startswith("/") or HOST in h
        ][:80],
        "headers": {
            k: headers.get(k)
            for k in [
                "strict-transport-security",
                "content-security-policy",
                "content-security-policy-report-only",
                "x-frame-options",
                "referrer-policy",
                "permissions-policy",
                "x-content-type-options",
                "content-encoding",
                "cache-control",
                "content-type",
            ]
        },
        "emails": sorted(set(re.findall(rf"[\w.+-]+@{re.escape(HOST)}", html, re.I))),
    }


def main():
    print("=" * 60)
    print("TLS")
    print("=" * 60)
    t = tls_info()
    for k, v in t.items():
        print(f"{k}: {v}")

    print("\n" + "=" * 60)
    print("DNS / MAIL")
    print("=" * 60)
    for q in ("MX", "TXT", "A"):
        print(f"\n-- {q} --")
        for ln in nslookup(q):
            print(ln)
    print("\n-- DMARC TXT --")
    for ln in nslookup("TXT", f"_dmarc.{HOST}"):
        print(ln)
    print("\n-- DKIM selectors (common) --")
    for sel in ("default", "google", "selector1", "selector2", "mail", "dkim"):
        lines = nslookup("TXT", f"{sel}._domainkey.{HOST}")
        joined = "\n".join(lines)
        if "NXDOMAIN" in joined or "can't find" in joined.lower() or "Non-existent" in joined:
            print(f"{sel}: not found")
        else:
            print(f"{sel}:")
            print(joined)

    pages = [
        f"{BASE}/",
        f"{BASE}/catalog/",
        f"{BASE}/catalog/saratov/",
        f"{BASE}/catalog/1/",
        f"{BASE}/blog/",
        f"{BASE}/blog/uchastok/",
        f"{BASE}/about/",
        f"{BASE}/contacts/",
        f"{BASE}/privacy/",
        f"{BASE}/compare/",
    ]

    results = []
    titles = Counter()
    descs = Counter()
    all_internal = []

    print("\n" + "=" * 60)
    print("PAGES SEO")
    print("=" * 60)
    for url in pages:
        r = analyze_page(url)
        results.append(r)
        titles[r["title"]] += 1
        if r["description"]:
            descs[r["description"]] += 1
        all_internal.extend(r["internal_links"])
        print(f"\n## {url} [{r['status']}]")
        print(f"title ({r['title_len']}): {r['title'][:90]}")
        print(f"desc ({r['desc_len']}): {(r['description'] or '')[:90]}")
        print(f"robots: {r['robots']}")
        print(f"canonical: {r['canonical']}")
        print(f"H1({r['h1_count']}): {r['h1s']}")
        print(f"lang={r['lang']} viewport={bool(r['viewport'])} charset_utf8={r['charset_ok']}")
        print(f"og:image={r['og_image']}")
        print(f"twitter:card={r['twitter_card']}")
        print(f"jsonld={r['jsonld_types']}")
        print(f"imgs={r['imgs']} no_alt={r['imgs_no_alt']} blank_no_noopener={r['blank_no_noopener']}")
        print(f"mixed_http={r['mixed_http']}")
        print(f"emails={r['emails']}")
        if url == f"{BASE}/":
            print("headers:", json.dumps(r["headers"], ensure_ascii=False, indent=2))

    print("\n" + "=" * 60)
    print("DUPLICATE TITLES")
    print("=" * 60)
    for t, c in titles.items():
        if c > 1 and t:
            print(f"x{c}: {t}")

    print("\nDUPLICATE DESCRIPTIONS")
    for d, c in descs.items():
        if c > 1 and d:
            print(f"x{c}: {d[:100]}")

    # sample internal link check
    uniq = []
    seen = set()
    for u in all_internal:
        if u in seen:
            continue
        seen.add(u)
        if any(x in u for x in ("#", "tel:", "mailto:", "javascript:")):
            continue
        uniq.append(u)
        if len(uniq) >= 25:
            break

    print("\n" + "=" * 60)
    print("INTERNAL LINKS SAMPLE")
    print("=" * 60)
    broken = []
    for u in uniq:
        st, _, _, final = fetch(u, "GET")
        mark = "OK" if st and st < 400 else "BAD"
        if mark == "BAD":
            broken.append((u, st, final))
        print(f"{mark} {st} {u}")

    # OG image details
    print("\n" + "=" * 60)
    print("OG IMAGE")
    print("=" * 60)
    st, hd, body, _ = fetch(f"{BASE}/og-image.jpg")
    print("status", st, "type", hd.get("content-type"), "len", hd.get("content-length") or len(body))
    print("cache", hd.get("cache-control"))

    # HTTP open
    print("\n" + "=" * 60)
    print("HTTP OPEN CHECK")
    print("=" * 60)
    req = urllib.request.Request(f"http://{HOST}/", method="GET", headers={"User-Agent": UA["User-Agent"]})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            print("unexpected 200 on HTTP", r.geturl())
    except Exception as e:
        print("HTTP result:", type(e).__name__, getattr(e, "code", None), e)

    print("\nDONE broken_links=", broken)


if __name__ == "__main__":
    import sys

    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    main()
