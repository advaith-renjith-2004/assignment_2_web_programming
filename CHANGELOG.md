# Changelog

All notable changes to the **EL Herbs and Spices Shop** project will be documented in this file.

The project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-10-03
### Added
- Organic origin guarantee badge and quick price sorting options in storefront catalog.
- Client-side sorting mechanism allowing customers to sort spices by price ascending and descending.

---

## [1.0.1] - 2026-10-03
### Fixed
- Accessibility contrast issues on secondary badge text.
- Added ARIA live region (`aria-live="polite"`) to cart badge counter for screen reader support.
- Normalized spacing and alignment for mobile responsive navigation bar.

---

## [1.0.0] - 2026-10-03
### Initial Production Release - EL Herbs and Spices Shop
Course: 23EEL43H Web Programming | Mar Baselios College of Engineering & Technology

### Added
#### Week 5 - Hosting, Deployment, Security and Release
- MVC architectural refactoring: organized backend into dedicated `routes/`, `controllers/`, `models/`, and `middleware/` directories.
- Dynamic port binding with `process.env.PORT` on host `0.0.0.0` for containerized cloud deployment.
- Netlify continuous deployment pipeline configuration via `netlify.toml` with custom headers and redirects.
- Render web service deployment configuration via `render.yaml`.
- Netlify Forms integration on dedicated `contact.html` with honeypot anti-spam bot field.
- Custom domain DNS record architecture and automated Let's Encrypt TLS 1.3 configuration guide.
- Project Security Checklist covering HTTPS, XSS prevention, SQL injection defense, secret management, CORS restriction, server-side validation, and OWASP Top 10 controls.
- Comprehensive codebase security audit for `innerHTML` and SQL concatenation.
- Performance optimization with `loading="lazy"` on all catalog images, asset caching headers, and asset minification.
- Full Lighthouse performance audit before and after optimization documentation.

#### Week 4 - REST API, Databases and Security
- Full MySQL relational database integration using `mysql2/promise` with in-memory fallback engine.
- Complete CRUD REST API endpoints for products (`/api/products`), tasks (`/api/tasks`), enquiries (`/api/enquiries`), and students (`/api/students`).
- SQL injection demonstration scripts and side-by-side comparative documentation (`/api/products/search` vs `/api/products/search-vulnerable`).
- Comprehensive SQL vs NoSQL architectural analysis documentation.
- Server-side payload validation middleware with 400 Bad Request responses.

#### Week 3 - Asynchronous JavaScript and JSON
- Integration of `async/await` and Promises for asynchronous data fetching from JSON data sources.
- Interactive Task Board with local storage persistence and server synchronization.
- Real-time catalog search and live category filtering.

#### Week 2 - Advanced CSS and JavaScript Logic
- Responsive e-commerce grid layout with custom CSS variables and dark-mode aesthetic.
- Interactive shopping cart with live subtotal calculation, quantity adjustment, and removal handlers.
- Client-side form validation using HTML5 Constraint Validation API.

#### Week 1 - HTML5 Semantics and Styling Baseline
- Semantic HTML5 structure for storefront homepage, product showcase, and inquiry forms.
- CSS layout system using Flexbox and Grid.
- Brand identity design and curated spice imagery.

### Fixed
- Refactored all dynamic `innerHTML` interpolations in `app.js` and `admin_products.html` with `escapeHTML()` entity encoder to eliminate Cross-Site Scripting (XSS).
- Fixed CORS rejection issues by introducing configurable `ALLOWED_ORIGIN` environment variable.
- Eliminated browser Mixed Content warnings by routing all API endpoints through HTTPS.
- Hardened error handling middleware to suppress internal stack traces in production environments.
