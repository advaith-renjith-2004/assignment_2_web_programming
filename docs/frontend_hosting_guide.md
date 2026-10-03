# Week 5 Day 2: Frontend Hosting, Netlify Forms, and Platform Comparison

## Executive Summary
This document fulfills Week 5 Day 2 requirements for the EL Herbs and Spices Shop project (Course 23EEL43H Web Programming). It provides technical documentation for:
1. Static frontend deployment on **GitHub Pages** with automated CI/CD continuous deployment.
2. Production deployment on **Netlify** with environment variable injection, deploy previews on Pull Requests, and instant atomic rollbacks.
3. Serverless form handling via **Netlify Forms** with spam prevention (`bot-field` honeypot), and a comparative analysis of GitHub Pages versus Netlify based on developer experience.

---

## 1. Task 1: GitHub Pages Deployment Walkthrough

### 1.1 Configuration Steps
1. Navigate to the GitHub repository: `https://github.com/advaith-renjith-2004/assignment_2_web_programming`
2. Select **Settings** > **Pages** (under the "Code and automation" left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main`.
   - **Folder**: Select `/ (root)`.
4. Click **Save**.

### 1.2 Generated Public URL
- **GitHub Pages Live URL**: `https://advaith-renjith-2004.github.io/assignment_2_web_programming/`

### 1.3 Automatic Update Verification Pipeline
1. In the repository, a small update is made (e.g., updating site title or contact navigation links).
2. The change is committed and pushed to `origin/main`:
   ```bash
   git add index.html
   git commit -m "Update navigation bar with direct link to contact page"
   git push origin main
   ```
3. GitHub automatically triggers the `pages-build-deployment` workflow in the **Actions** tab.
4. **Verification**: After 45 to 60 seconds, reloading `https://advaith-renjith-2004.github.io/assignment_2_web_programming/` confirms that the changes are live on GitHub's Fastly CDN edge without manual intervention.

---

## 2. Task 2: Netlify Deployment and Continuous Delivery

### 2.1 Repository Connection & Build Configuration
1. Log in to the [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** > **Import an existing project** > **GitHub**.
3. Authorize access to `advaith-renjith-2004/assignment_2_web_programming`.
4. Configure site settings:
   - **Base directory**: (Leave blank / root)
   - **Build command**: `# no build needed`
   - **Publish directory**: `.`
5. Click **Deploy assignment_2_web_programming**.

### 2.2 Configuration via `netlify.toml`
To ensure automated configuration across environments, `netlify.toml` was added to the repository root:
```toml
[build]
  publish = "."
  command = "# no build needed"

[build.environment]
  NODE_VERSION = "20.11.0"

[[redirects]]
  from = "/contact"
  to = "/contact.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2.3 Environment Variable Setup
1. In the Netlify site dashboard, navigate to **Site configuration** > **Environment variables**.
2. Click **Add a variable** > **Add a single variable**.
3. Configure:
   - **Key**: `API_BASE_URL`
   - **Value**: `https://el-herbs-backend.onrender.com`
   - **Scopes**: Checked for *Builds*, *Functions*, and *Runtime*.
4. This allows the frontend to reference the production backend endpoint while maintaining local fallbacks.

### 2.4 Pull Request Deploy Previews
1. Create and switch to a feature branch:
   ```bash
   git checkout -b feature/contact-page-preview
   git push -u origin feature/contact-page-preview
   ```
2. Open a Pull Request from `feature/contact-page-preview` into `main` on GitHub.
3. Netlify automatically creates an isolated preview build and posts a comment on the GitHub PR:
   - **Deploy Preview Link Format**: `https://deploy-preview-<PR_NUMBER>--el-herbs-shop.netlify.app`
4. This sandbox URL enables team testing before code reaches production.

### 2.5 Instant Rollback Demonstration
1. Navigate to the Netlify site dashboard and click the **Deploys** tab.
2. The deploys log lists all historical builds:
   - `Deploy #12` (Current production deploy)
   - `Deploy #11` (Previous stable deploy)
3. To rollback:
   - Click on `Deploy #11`.
   - Click the **Publish deploy** button.
   - Netlify instantly switches traffic to the immutable asset snapshot of `Deploy #11` within 1 second worldwide, requiring zero git reverts or rebuild delays.

---

## 3. Task 3: Netlify Forms Integration & Customer Contact

### 3.1 Contact Page Implementation (`contact.html`)
The contact page uses Netlify's built-in form detection:
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/contact.html?submitted=true">
    <input type="hidden" name="form-name" value="contact" />
    <p class="bot-field">
        <label>Do not fill this out if you are human: <input name="bot-field" /></label>
    </p>

    <div class="form-row">
        <input type="text" name="name" required placeholder="Full Name" />
        <input type="email" name="email" required placeholder="Email Address" />
    </div>
    <select name="category">
        <option value="wholesale">Wholesale & Commercial Bulk Order</option>
        <option value="organic-cert">Organic Origin Verification</option>
    </select>
    <textarea name="message" required placeholder="Your message..."></textarea>
    <button type="submit">Send Message via Netlify</button>
</form>
```

### 3.2 Key Mechanisms
- **`data-netlify="true"`**: Tells Netlify's build engine to parse this form during deployment and provision a serverless submission endpoint.
- **`name="form-name" value="contact"`**: Identifies the form namespace within Netlify.
- **`netlify-honeypot="bot-field"`**: Creates a hidden input field that human visitors do not see. If a spam bot populates this field, Netlify automatically drops the submission silently.

### 3.3 Dashboard Verification
1. User completes and submits the form at `https://el-herbs-shop.netlify.app/contact.html`.
2. Open Netlify Dashboard > **Site configuration** > **Forms**.
3. The form `contact` is listed with all submitted data:
   - Sender Name
   - Email Address
   - Category Selected
   - Timestamp and Client IP
   - Message Payload
4. Submissions can be exported directly as CSV or routed to email notifications and Slack webhooks.

---

## 4. Platform Comparison: GitHub Pages vs. Netlify

Based on hands-on deployment and testing of the EL Herbs and Spices Shop, the following comparison highlights key architectural differences:

| Feature / Dimension | GitHub Pages | Netlify | Practical Impact on Shop |
| :--- | :--- | :--- | :--- |
| **Primary Architecture** | Static site hosting for Git repositories | Edge-first cloud platform for Jamstack & modern web apps | Netlify provides dynamic platform features without server code. |
| **Form Handling** | No native support; requires external backend or Google Forms | Native serverless form processing via `data-netlify="true"` | Enables customer inquiries on static frontend with zero backend dependencies. |
| **PR Deploy Previews** | Not available out of the box (requires custom GitHub Actions + S3/Pages artifacts) | Automatic preview URL generated for every Pull Request | Allows stakeholders to review UI changes before merging into `main`. |
| **Rollback Capability** | Manual (must create a revert commit, push, and wait for rebuild) | Instant 1-click atomic rollback to any historical deploy snapshot | Critical for e-commerce: roll back flawed pricing or layout in under 1 second. |
| **Custom Headers & Security** | Very limited; cannot customize response headers on free tier | Full control via `netlify.toml` (`CSP`, `X-Frame-Options`, `HSTS`) | Allows hardening HTTP headers and configuring fine-grained caching. |
| **URL Rewrites & Redirects** | Only client-side hacks (e.g., `404.html` SPA routing tricks) | First-class routing engine with HTTP 200 rewrites and 301 redirects | Clean URLs like `/contact` and `/admin` without `.html` extension. |
| **Global Edge Network (CDN)** | Fastly CDN | Netlify Edge (High performance multi-cloud edge network) | Both deliver sub-50ms latency globally for static assets. |
| **SSL / HTTPS** | Free Let's Encrypt certificates automatically provisioned | Free Let's Encrypt certificates with automated renewal & TLS 1.3 | Both provide secure HTTPS out-of-the-box. |
| **Free Tier Generosity** | 100 GB/month bandwidth, 1 GB repository limit | 100 GB/month bandwidth, 300 build minutes/month, 100 form submissions/mo | Netlify's free tier includes full commercial-grade features. |

### Conclusion and Recommendation
For simple project documentation or personal portfolios, GitHub Pages is exceptionally convenient due to its tight integration with GitHub. However, for an interactive business frontend such as the **EL Herbs and Spices Shop**, **Netlify is significantly superior**. Netlify's built-in forms eliminate the need to run a dedicated backend server for contact inquiries, deploy previews safeguard against regressions, and instant rollbacks provide production-grade resilience.
