# Week 5 Day 4 Task 1: Custom Domain Configuration and HTTPS Enforcement

## Executive Summary
This document provides the technical reference and configuration guide for attaching a custom domain (`elherbsandspices.store`) to the Netlify production site, configuring DNS records, completing automated domain verification, provisioning SSL/TLS certificates via Let's Encrypt, and enforcing HTTPS.

---

## 1. Domain Registration and Netlify DNS Architecture

### 1.1 Architectural Topology
```
[User Browser]
       │
       ▼ (HTTPS :443 / TLS 1.3)
[Anycast Edge CDN] ─── Netlify Load Balancer (75.2.60.5)
       │
       ▼ (Origin Routing)
[EL Herbs and Spices Shop Static Assets]
```

### 1.2 DNS Record Configuration Table
To delegate public traffic to Netlify's high-performance edge network without transferring the domain registrar, the following standard DNS records are configured at the domain registrar:

| Record Type | Host / Name | Target / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (apex/root) | `75.2.60.5` | 3600 (1 hour) | Routes root domain `elherbsandspices.store` to Netlify's dedicated load balancer |
| **CNAME** | `www` | `el-herbs-shop.netlify.app` | 3600 (1 hour) | Canonical name alias routing `www.elherbsandspices.store` to Netlify site slug |
| **CAA** | `@` | `0 issue "letsencrypt.org"` | 86400 (24h) | Restricts SSL certificate issuance exclusively to Let's Encrypt CA |
| **TXT** | `_netlify` | `el-herbs-shop` | 3600 (1 hour) | Netlify domain verification token proving domain control |

---

## 2. Step-by-Step Custom Domain Setup on Netlify

### 2.1 Adding the Custom Domain
1. Log in to the [Netlify Dashboard](https://app.netlify.com).
2. Select the site **el-herbs-shop**.
3. Navigate to **Site configuration** > **Domain management** > **Custom domains**.
4. Click **Add a domain**.
5. Enter `elherbsandspices.store` and click **Verify**.
6. Select **Add domain**. Netlify automatically attaches both `elherbsandspices.store` (primary domain) and `www.elherbsandspices.store` (redirected automatically to primary).

### 2.2 DNS Propagation Verification
Verify that DNS records have propagated globally using standard network diagnostic tools:

```bash
# Check Apex A Record
nslookup -type=A elherbsandspices.store 8.8.8.8
# Output:
# Non-authoritative answer:
# Name:    elherbsandspices.store
# Address: 75.2.60.5

# Check WWW CNAME Record
nslookup -type=CNAME www.elherbsandspices.store 8.8.8.8
# Output:
# Non-authoritative answer:
# www.elherbsandspices.store canonical name = el-herbs-shop.netlify.app
```

---

## 3. HTTPS Provisioning and TLS Certificate Verification

### 3.1 Automated Let's Encrypt Issuance
1. Under **Domain management** > **HTTPS**:
   - Status: `Certificate issued`
   - Provider: `Let's Encrypt`
   - Domains covered: `elherbsandspices.store`, `www.elherbsandspices.store`, `el-herbs-shop.netlify.app`
   - Key Exchange: ECDHE_RSA with P-256
   - Cipher: AES_128_GCM
   - Renewal: Automated every 60 days before expiration.

### 3.2 Forcing HTTPS Redirection
1. In the **HTTPS** section, click **Force HTTPS**.
2. When enabled, Netlify automatically returns an HTTP `301 Moved Permanently` redirect for any incoming `http://` request, rewriting the URL to `https://`.
3. Added the following HSTS header in `netlify.toml` to instruct browsers to cache the HTTPS requirement for one full year:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
   ```

### 3.3 Verification of Force HTTPS via curl
```bash
curl -I http://elherbsandspices.store
# Response:
# HTTP/1.1 301 Moved Permanently
# Location: https://elherbsandspices.store/
# Server: Netlify

curl -I https://elherbsandspices.store
# Response:
# HTTP/2 200 OK
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
```
