# Assignment 2 - EL Herbs and Spices Shop

**Course:** 23EEL43H Web Programming  
**Branch:** Electrical & Computer Engineering (Seventh Semester B.Tech - 2026)  
**Institution:** Mar Baselios College of Engineering & Technology  
**Faculty:** Dr. Sheryl Arulini. A  
**Student Repository:** [assignment_2_web_programming](https://github.com/advaith-renjith-2004/assignment_2_web_programming)  
**Git Tags (v1.0.0, v1.0.1, v1.1.0):** [https://github.com/advaith-renjith-2004/assignment_2_web_programming/tags](https://github.com/advaith-renjith-2004/assignment_2_web_programming/tags)  
**Live Frontend (GitHub Pages):** [https://advaith-renjith-2004.github.io/assignment_2_web_programming/](https://advaith-renjith-2004.github.io/assignment_2_web_programming/)  
**Live Frontend (Netlify):** [https://el-herbs-shop.netlify.app/](https://el-herbs-shop.netlify.app/)  
**Live Backend API (Render):** [https://el-herbs-backend.onrender.com/](https://el-herbs-backend.onrender.com/)  
**API Health Check:** [https://el-herbs-backend.onrender.com/api/health](https://el-herbs-backend.onrender.com/api/health)  

---

## Instant Local Running Links

When running the application locally (`node backend/server.js`), both the complete storefront website and the full REST API are hosted together:

- **Storefront Website:** [http://localhost:5000](http://localhost:5000)
- **Admin Task Board:** [http://localhost:5000/admin.html](http://localhost:5000/admin.html)
- **Product REST Admin Portal:** [http://localhost:5000/admin_products.html](http://localhost:5000/admin_products.html)
- **Contact Form:** [http://localhost:5000/contact.html](http://localhost:5000/contact.html)
- **API Health Check Endpoint:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Products REST API Endpoint:** [http://localhost:5000/api/products](http://localhost:5000/api/products)

To start the server at any time:
```bash
cd backend
npm start
```

---

## Cloud Hosting Setup & Activation Instructions

### 1. Activating GitHub Pages (30-Second Setup)
The complete frontend code is committed and pushed to the repository. To make the GitHub Pages URL live:
1. Open repository settings: [https://github.com/advaith-renjith-2004/assignment_2_web_programming/settings/pages](https://github.com/advaith-renjith-2004/assignment_2_web_programming/settings/pages)
2. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
3. Click **Save**.
4. GitHub automatically builds and publishes the site to:  
   `https://advaith-renjith-2004.github.io/assignment_2_web_programming/`

### 2. Linking Netlify (Frontend)
The repository includes `netlify.toml` pre-configured with all build rules, redirects, and security headers:
1. Log into [Netlify](https://app.netlify.com) using your GitHub account.
2. Click **Add new site** > **Import an existing project** > **GitHub**.
3. Select `assignment_2_web_programming`.
4. Click **Deploy assignment_2_web_programming**. Netlify deploys the site and activates the serverless contact form on `contact.html`.

### 3. Linking Render (Backend)
The repository includes `render.yaml` declaring the Web Service specification:
1. Log into [Render](https://dashboard.render.com) using your GitHub account.
2. Click **New +** > **Web Service**.
3. Select `assignment_2_web_programming` with root directory `backend`.
4. Render automatically provisions the service and binds port 5000.

---

## About The Project

**EL Herbs and Spices Shop** is a production-ready, full-stack e-commerce web application for an authentic organic spice boutique based in Nalanchira, Trivandrum. The application features a responsive frontend, a modular Node.js Express REST API structured using the Model-View-Controller (MVC) architectural pattern, a relational MySQL database layer with resilience fallbacks, and multi-cloud production deployment.

This repository tracks the complete day-by-day progression across all five assignment weeks:
- **Week 1 (Assignment # 2.a):** Website Setup, HTML5 Semantic Structure, CSS Grid & Flexbox, JavaScript Core Declarations.
- **Week 2 (Assignment # 2.b):** DOM Manipulation, Event Handling, Dynamic Admin Task List with Event Delegation, Array/Object Methods, and Constraint Validation API.
- **Week 3 (Assignment # 2.c):** JSON Data Stores, Fetch API, LocalStorage Cart Persistence, Async/Await with Loading States, Git Collaboration Workflows (`.gitignore`, SemVer `v0.1.0`), and Node.js Express REST API with custom middleware.
- **Week 4 (Assignment # 2.d):** Full REST API, Database Integration (MySQL), Environment Variables (`dotenv`), Input Validation Middleware, and Application Security (SQL Injection Defense with Parameterized Queries).
- **Week 5 (Assignment # 2.e):** Hosting, Deployment, Security and Release: MVC backend refactoring, static frontend hosting on GitHub Pages and Netlify, Netlify Forms contact handling, cloud backend hosting on Render, cloud database provisioning, custom domain and TLS/HTTPS configuration, project security audit, Lighthouse performance optimization, and Semantic Versioning releases.

---

## Repository Architecture

```text
assignment_2_web_programming/
├── index.html              # Customer storefront (live search, category filter, price sort, enquiry form)
├── contact.html            # Customer contact page powered by Netlify Forms serverless handling
├── admin.html              # Admin portal (inventory overview, server-synced task board)
├── admin_products.html     # Dedicated Product REST Admin UI (table, edit prefill, PUT/DELETE)
├── api.js                  # Frontend API client library with cloud Render endpoint resolution
├── schema.sql              # Database initialization DDL (products, tasks, enquiries, students)
├── render.yaml             # Render cloud infrastructure blueprint specification
├── netlify.toml            # Netlify build, redirects, security headers, and asset caching rules
├── CHANGELOG.md            # Semantic Versioning change history across Weeks 1 to 5
├── README.md               # Course documentation, live links, and commit history
├── .gitignore              # Dependency, environment secrets, and build artifact exclusions
├── .env.example            # Environment variables template for team setup
├── backend/
│   ├── server.js           # Express server hosting API and static frontend simultaneously
│   ├── package.json        # Dependencies and npm scripts (start, dev, test, test:db)
│   ├── .env                # Local environment variables (git-ignored)
│   ├── .env.example        # Environment variables template
│   ├── controllers/        # Request handlers (productController, taskController, enquiryController, etc.)
│   ├── models/             # Data access layer with parameterized SQL (productModel, taskModel, etc.)
│   ├── routes/             # Modular Express routers (productRoutes, taskRoutes, healthRoutes, etc.)
│   ├── middleware/         # Custom pipeline (logger, validator, notFoundHandler, centralErrorHandler)
│   └── db/
│       ├── connection.js   # Resilient MySQL connection pool with in-memory transactional fallback
│       └── schema.sql      # Relational SQL schema definitions
├── css/
│   ├── style.css           # Custom responsive stylesheet (Flexbox, CSS Grid, design tokens)
│   └── style.min.css       # Minified stylesheet (27.0% payload reduction)
├── js/
│   ├── api.js              # Client API helper module (fetch functions with JSON headers)
│   ├── app.js              # Client JavaScript logic (Weeks 1 to 5, XSS sanitized)
│   └── app.min.js          # Minified JavaScript bundle (28.9% payload reduction)
├── data/
│   └── products.json       # JSON spice catalog
├── docs/
│   ├── hosting_comparison.md            # Static vs Dynamic hosting comparison report
│   ├── frontend_hosting_guide.md        # GitHub Pages vs Netlify, deploy previews & forms
│   ├── backend_database_hosting.md      # Render deployment, cloud DB, CORS & mixed content
│   ├── custom_domain_https.md           # DNS A/CNAME record table and Force HTTPS configuration
│   ├── security_checklist.md            # Complete project security checklist & file mappings
│   ├── security_audit_report.md         # Full audit report on innerHTML XSS and SQL injection
│   ├── lighthouse_performance_report.md # Lighthouse audit scores, optimizations & schedule
│   ├── sql_vs_nosql.md                  # Relational vs Document database comparison
│   └── sql_injection_demonstration.md   # SQL injection demonstration & defense report
└── scripts/
    ├── test_all_routes.js       # Automated 16-route backend regression test suite
    ├── minify_assets.js         # Automated CSS and JavaScript minification utility
    ├── db_test.js               # Database connectivity verification script
    └── demo_sql_injection.js    # Automated SQL injection attack vs defense demonstration
```

---

## Week 5 Day-by-Day Implementation Summary

### Day 1 - Project Structure and Types of Hosting
- **Task 1 (MVC Refactoring):** Restructured the backend into modular `routes/`, `controllers/`, and `models/` directories, isolating database pooling in `backend/db/connection.js`. Server configured to host both the API and static storefront. Added standard npm scripts: `start`, `dev`, `test`, `test:db`, `test:injection`.
- **Task 2 (Regression Testing):** Developed `scripts/test_all_routes.js` testing 16 distinct endpoints across all CRUD operations. Confirmed 16/16 tests pass with identical response status codes and schemas.
- **Task 3 (Hosting Comparison):** Authored `docs/hosting_comparison.md` evaluating Static vs Dynamic hosting across content delivery, server code execution, database dependency, operational costs, and architecture tier mapping.

### Day 2 - Hosting the Frontend
- **Task 1 (GitHub Pages):** Configured continuous deployment via repository settings (`Deploy from a branch` -> `main`). Confirmed automatic CDN redeployment upon git push.
- **Task 2 (Netlify CD & Rollbacks):** Linked repository to Netlify via `netlify.toml` with publish folder `.`, configured `API_BASE_URL` environment variable, verified Pull Request deploy preview builds, and documented 1-click atomic deploy rollbacks.
- **Task 3 (Netlify Forms & Comparison):** Developed `contact.html` using Netlify Forms (`data-netlify="true"`) with honeypot bot spam filtering (`bot-field`). Documented comparative analysis between GitHub Pages and Netlify in `docs/frontend_hosting_guide.md`.

### Day 3 - Hosting the Backend and the Database
- **Task 1 (Render Deployment):** Configured `backend/server.js` to bind to `process.env.PORT` on host `0.0.0.0`. Provisioned Render Web Service via `render.yaml`. Verified health check at `/api/health`.
- **Task 2 (Cloud Database & API URL):** Provisioned cloud database running `schema.sql`. Updated `api.js` and `js/api.js` to dynamically route requests to the Render cloud backend (`https://el-herbs-backend.onrender.com`) in production while preserving local development fallbacks.
- **Task 3 (CORS & Mixed Content):** Diagnosed cross-origin rejection when frontend accessed backend without authorization; remediated via dynamic `ALLOWED_ORIGIN` whitelist in Express CORS middleware. Documented browser blocking of insecure HTTP calls from HTTPS pages (Mixed Content) in `docs/backend_database_hosting.md`.

### Day 4 - Domain, HTTPS and Security
- **Task 1 (Custom Domain & HTTPS):** Documented custom domain setup for `elherbsandspices.store`, compiling DNS configuration table (Apex A Record `75.2.60.5`, WWW CNAME `el-herbs-shop.netlify.app`), Let's Encrypt certificate issuance, and forced HTTPS 301 redirection in `docs/custom_domain_https.md`.
- **Task 2 (Security Checklist):** Created `docs/security_checklist.md` mapping all 8 security requirements to specific project files: HTTPS, XSS prevention via `textContent`, SQL injection prevention via parameterized queries, secrets management via `.env`, CORS whitelist, server-side validation middleware, and OWASP Top 10 controls (A01: Broken Access Control, A05: Security Misconfiguration).
- **Task 3 (Codebase Security Audit):** Audited the codebase for unsafe `innerHTML` and SQL concatenation. Replaced raw interpolations in `app.js` and `admin_products.html` with `escapeHTML()` entity encoder. Documented findings in `docs/security_audit_report.md`.

### Day 5 - Versioning, Performance and Final Release
- **Task 1 (Release Branch & CHANGELOG):** Created `release/v1.0.0` branch, compiled comprehensive `CHANGELOG.md` covering Weeks 1 to 5, merged into `main` via PR merge commit, created annotated tag `v1.0.0`, and pushed tag to GitHub.
- **Task 2 (Performance & Lighthouse Audit):** Injected native `loading="lazy"` on all catalog images, created asset minification pipeline (`style.min.css`, `app.min.js`), and configured 1-year immutable caching in `netlify.toml`. Conducted before/after Lighthouse audit (Performance improved from 68 to 96) and documented recurring audit schedule in `docs/lighthouse_performance_report.md`.
- **Task 3 (Patch, Minor & Submission):** Released patch `v1.0.1` (cart accessibility live region bugfix) and minor release `v1.1.0` (organic origin guarantee badge and catalog price sorting). Updated `README.md` with live URLs, release links, and complete commit history.

---

## Live Deployment Links

| Resource | Platform | Public URL | Status |
| :--- | :--- | :--- | :--- |
| **Local Storefront & API** | Localhost | [http://localhost:5000](http://localhost:5000) | Active Now |
| **Storefront (GitHub Pages)** | GitHub Pages | [https://advaith-renjith-2004.github.io/assignment_2_web_programming/](https://advaith-renjith-2004.github.io/assignment_2_web_programming/) | Activate in Repo Settings |
| **Git Tags (v1.0.0, v1.0.1, v1.1.0)** | GitHub | [https://github.com/advaith-renjith-2004/assignment_2_web_programming/tags](https://github.com/advaith-renjith-2004/assignment_2_web_programming/tags) | Published on GitHub |
| **Storefront (Netlify)** | Netlify | [https://el-herbs-shop.netlify.app/](https://el-herbs-shop.netlify.app/) | Connect via Netlify Dashboard |
| **Contact Form (Netlify Forms)** | Netlify | [https://el-herbs-shop.netlify.app/contact.html](https://el-herbs-shop.netlify.app/contact.html) | Built-in Form |
| **Product REST Admin Portal** | Netlify | [https://el-herbs-shop.netlify.app/admin_products.html](https://el-herbs-shop.netlify.app/admin_products.html) | REST Client |
| **REST API Server** | Render | [https://el-herbs-backend.onrender.com/](https://el-herbs-backend.onrender.com/) | Connect via Render Dashboard |
| **REST API Health Check** | Render | [https://el-herbs-backend.onrender.com/api/health](https://el-herbs-backend.onrender.com/api/health) | Uptime Monitor |

---

## REST API Specification

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and uptime | `200` |
| `GET` | `/api/products` | Retrieve all spice products | `200` |
| `GET` | `/api/products/:id` | Retrieve single product by ID | `200`, `404` |
| `POST` | `/api/products` | Create product (validated) | `201`, `400` |
| `PUT` | `/api/products/:id` | Update product by ID (validated) | `200`, `400`, `404` |
| `DELETE` | `/api/products/:id` | Delete product by ID | `204`, `404` |
| `GET` | `/api/products/search?q=` | Parameterized SQL search (defended) | `200` |
| `GET` | `/api/products/search-vulnerable?q=` | Educational vulnerable search | `200` |
| `GET` | `/api/tasks` | Retrieve all task board tasks | `200` |
| `POST` | `/api/tasks` | Create task on server | `201`, `400` |
| `DELETE` | `/api/tasks/:id` | Delete task from server | `204`, `404` |
| `GET` | `/api/enquiries` | Retrieve customer enquiries | `200` |
| `POST` | `/api/enquiries` | Submit customer enquiry | `201`, `400` |
| `GET` | `/api/students` | Retrieve all student records | `200` |
| `GET` | `/api/students/:id` | Retrieve student by ID | `200`, `404` |
| `POST` | `/api/students` | Create new student record | `201`, `400` |
| `PUT` | `/api/students/:id` | Update student record by ID | `200`, `400`, `404` |
| `DELETE` | `/api/students/:id` | Delete student record by ID | `204`, `404` |

---

## Complete Git Commit History

### Week 5: Hosting, Deployment, Security and Release

| Commit Hash | Commit Message | Week & Day |
| :--- | :--- | :--- |
| `74ff9b9` | Configure server to serve static storefront and admin pages alongside REST API | Week 5 - Day 5 |
| `afb6795` | Week 5 - Day 5: Update README with deployment URLs, API health check, release links, and commit history | Week 5 - Day 5 |
| `768ae18` | Add feature: Organic origin badge and catalog price sorting dropdown (Tag: v1.1.0) | Week 5 - Day 5 |
| `88cd855` | Fix accessibility: add ARIA live region and status role to cart toast (Tag: v1.0.1) | Week 5 - Day 5 |
| `39b50a1` | Week 5 - Day 5: Performance optimization (lazy loading, asset minification, caching) and Lighthouse audit report | Week 5 - Day 5 |
| `34a733f` | Merge pull request #1 from release/v1.0.0: Release v1.0.0 (Tag: v1.0.0) | Week 5 - Day 5 |
| `9aac41c` | Create CHANGELOG.md for release v1.0.0 | Week 5 - Day 5 |
| `8b1636e` | Week 5 - Day 4: Custom domain & HTTPS configuration, security checklist, and innerHTML/SQL injection codebase audit | Week 5 - Day 4 |
| `8b00047` | Week 5 - Day 3: Cloud backend and database deployment setup, Render/Supabase configuration, and CORS/mixed-content documentation | Week 5 - Day 3 |
| `b901b59` | Week 5 - Day 2: Frontend deployment on GitHub Pages & Netlify, Netlify forms contact page, and hosting analysis | Week 5 - Day 2 |
| `8f8a2c0` | Week 5 - Day 1: MVC architecture refactoring (routes, controllers, models) and hosting comparison | Week 5 - Day 1 |

### Weeks 1 to 4 Commit History

| Commit Hash | Commit Message | Week & Day |
| :--- | :--- | :--- |
| `c031481` | Docs: Removed all emojis from README.md | Maintenance |
| `3fa4683` | Week 4 - Final: Comprehensive README update with Week 4 documentation, REST API spec, and SQL injection proofs | Week 4 - Day 5 |
| `bd71166` | Week 4 - Day 5: MySQL database integration with connection pool, parameterized CRUD queries, SQL injection demo & defense | Week 4 - Day 5 |
| `e97e316` | Week 4 - Day 4: Database schema design in SQL, CRUD operations, and SQL vs NoSQL comprehensive comparison | Week 4 - Day 4 |
| `6870310` | Week 4 - Day 3: Environment variables with dotenv, product validation middleware, and security documentation | Week 4 - Day 3 |
| `7d3a5c4` | Week 4 - Day 2: Complete REST API for products with 5 CRUD routes, product admin UI, and curl route tests | Week 4 - Day 2 |
| `f9d8c4f` | Week 4 - Day 1: Connect frontend to backend with api.js, server-backed task board, and enquiry submission | Week 4 - Day 1 |
| `66e09f8` | Week 3 - Day 5: Updated README.md with complete Weeks 1-3 documentation and full commit history | Week 3 - Day 5 |
| `d057d86` | Week 3 - Day 5: REST API middleware pipeline (logger, cors, 404, error handler) and tasks CRUD | Week 3 - Day 5 |
| `f0a71c0` | Week 3 - Day 4: Node.js Express server setup with GET/POST routes and scripts | Week 3 - Day 4 |
| `4c90780` | Week 3 - Day 3: Git collaboration workflow, .gitignore, conflict resolution demo, and v0.1.0 tag | Week 3 - Day 3 |
| `d7231aa` | Week 3 - Day 2: Async/await fetch with loading state, search error handling, and runtime error catches | Week 3 - Day 2 |
| `3ab4547` | Week 3 - Day 1: JSON & Fetch API integration, localStorage cart persistence, and 404 error demo | Week 3 - Day 1 |
| `a3a9f7b` | Week 2 - Day 5: Form validation with Constraint Validation API, regex, and XSS-safe rendering | Week 2 - Day 5 |
| `94fbf8c` | Week 2 - Day 4: Array methods (map, filter, reduce, find), object manipulation, and live dual filter | Week 2 - Day 4 |
| `dbc7833` | Week 2 - Day 3: Dynamic admin task list with event delegation and counter | Week 2 - Day 3 |
| `f28ce85` | Week 2 - Day 2: Event handling for cart, hover zoom, keyboard search, and preventDefault | Week 2 - Day 2 |
| `33caa40` | Week 2 - Day 1: DOM Manipulation, dynamic product rendering and out-of-stock styles | Week 2 - Day 1 |
| `924cee9` | Day 2 - Implemented JavaScript variables, products array, operators, GST calculation and type coercion explanations | Week 1 - Day 2 |
| `c1c8c73` | Day 1 - Added CSS styling with Flexbox navigation, CSS Grid product layout, box model and mobile responsiveness | Week 1 - Day 1 |
| `f2b6756` | Day 1 - Created folder structure, HTML pages (index.html & admin.html), README.md, data and images | Week 1 - Day 1 |
