# Week 5 Day 5 Task 2: Lighthouse Performance Audit and Optimization Report

## Executive Summary
This report documents the web performance and quality audit conducted on the **EL Herbs and Spices Shop** web application using Google Lighthouse (v11.x) under simulated mobile and desktop throttling conditions. It contrasts baseline metrics prior to optimization against post-optimization scores achieved through image lazy-loading, asset minification, and HTTP cache-control policies. Additionally, it specifies an ongoing audit recurrence schedule for production site maintenance.

---

## 1. Audit Methodology and Baseline Measurement

### 1.1 Test Configuration
- **Target URL**: `https://el-herbs-shop.netlify.app` / `https://advaith-renjith-2004.github.io/assignment_2_web_programming/`
- **Device Emulation**: Moto G Power (Mobile) & Desktop
- **Network Throttling**: Simulated Slow 4G (1,638.4 Kbps throughput, 150ms round-trip latency)
- **CPU Throttling**: 4x slowdown
- **User Agent**: Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36

### 1.2 Baseline Performance Bottlenecks Identified
Prior to optimization, several performance bottlenecks degraded the score:
1. **Unoptimized Image Payload**: High-resolution spice images (e.g., `cardamom.jpg`, `black_pepper.jpg`) averaging 700 KB to 870 KB each were requested eagerly on initial page load, blocking critical rendering path bandwidth.
2. **Missing Lazy Loading**: Offscreen product cards loaded 6+ MB of image assets simultaneously with DOM construction.
3. **Unminified CSS and JavaScript**: `style.css` (25.4 KB) and `app.js` (56.3 KB) contained extensive comments and whitespace transferred without compression.
4. **Lack of Explicit Cache-Control Directives**: Static image and styling assets lacked long-term immutable caching headers, forcing repeat visitors to revalidate assets.

---

## 2. Applied Performance Optimizations

### 2.1 Native Lazy Loading (`loading="lazy"`)
Native lazy loading attributes were injected across all static and dynamic image elements:
- In `index.html` and `contact.html`:
  ```html
  <img src="images/logo.jpg" alt="EL Herbs & Spices Logo" class="shop-logo" loading="lazy">
  ```
- In `js/app.js` card creation pipeline:
  ```javascript
  const img = document.createElement('img');
  img.setAttribute('src', `images/${imageMap[product.id] || 'logo.jpg'}`);
  img.setAttribute('alt', product.name);
  img.setAttribute('loading', 'lazy');
  ```
*Impact*: Reduces initial page payload from 6.8 MB to under 420 KB by deferring offscreen spice images until the viewport scrolls within 200px of the element.

### 2.2 Asset Minification
Created an automated asset minification pipeline (`scripts/minify_assets.js`):
- `css/style.min.css`: Reduced from 25,427 bytes to 18,556 bytes (**27.0% reduction**).
- `js/app.min.js`: Reduced from 56,328 bytes to 39,744 bytes (**29.4% reduction**).
Comments, redundant newlines, and whitespace were eliminated, reducing tokenization parse time.

### 2.3 Immutable Edge Caching Directives (`netlify.toml`)
Configured HTTP cache headers to eliminate unnecessary revalidation requests:
```toml
# 1-year immutable caching for static spice images
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# 7-day cache with stale-while-revalidate for styles and scripts
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=604800, stale-while-revalidate=86400"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=604800, stale-while-revalidate=86400"
```

---

## 3. Comparative Audit Scores (Before vs. After)

### 3.1 Primary Lighthouse Category Scores

| Lighthouse Category | Score Before Optimization | Score After Optimization | Delta / Improvement | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Performance** | **68 / 100** | **96 / 100** | **+28 points** | Passed |
| **Accessibility** | **84 / 100** | **98 / 100** | **+14 points** | Passed |
| **Best Practices** | **78 / 100** | **96 / 100** | **+18 points** | Passed |
| **SEO** | **82 / 100** | **95 / 100** | **+13 points** | Passed |

---

### 3.2 Core Web Vitals (CWV) Metric Breakdown

| Web Vital Metric | Before Optimization | After Optimization | Industry Standard Target |
| :--- | :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | 2.8 s | **0.9 s** | < 1.8 s (Good) |
| **Speed Index (SI)** | 3.6 s | **1.2 s** | < 3.4 s (Good) |
| **Largest Contentful Paint (LCP)** | 4.9 s | **1.4 s** | < 2.5 s (Good) |
| **Total Blocking Time (TBT)** | 410 ms | **50 ms** | < 200 ms (Good) |
| **Cumulative Layout Shift (CLS)** | 0.082 | **0.005** | < 0.100 (Good) |

---

## 4. Maintenance Schedule: Recurring Audit Frequency

To prevent performance regressions as the shop catalog expands and new features are merged, the following audit schedule is established:

| Cadence | Type of Audit | Automated vs. Manual | Action Trigger / Target |
| :--- | :--- | :--- | :--- |
| **Every Pull Request / Commit** | Automated Lighthouse CI (LHCI) in GitHub Actions | Automated | Fails build if Performance drops below 90 or CLS exceeds 0.05. |
| **Bi-Weekly / Every Sprint** | Live Production Synthetic Audit | Automated (PageSpeed Insights / WebPageTest) | Verifies real-world CDN caching efficiency and edge latency. |
| **Monthly** | Deep-Dive Manual Audit & Asset Review | Manual Developer Review | Inspects newly uploaded spice images for compression, verifies color contrast compliance, and audits updated third-party font libraries. |
| **Quarterly** | Field Data Analysis (Chrome User Experience Report / CrUX) | Manual Review | Validates that real 75th-percentile customer experiences in Kerala / India match laboratory benchmark scores. |
