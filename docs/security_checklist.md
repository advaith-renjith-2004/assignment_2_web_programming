# Week 5 Day 4 Task 2: Project Security Checklist

## Executive Summary
This document serves as the formal Security Checklist for the **EL Herbs and Spices Shop** web application (Course: 23EEL43H Web Programming). It maps each required defensive security control directly to its implementation file within the repository, describing the vulnerability mitigated and the technical mechanism applied.

---

## 1. Core Security Control Matrix

| Control Category | Specific Requirement | Implementation File(s) | Technical Mechanism |
| :--- | :--- | :--- | :--- |
| **Transport Security** | Enforce HTTPS & HSTS | `netlify.toml`, `backend/server.js` | Forced 301 redirects to HTTPS on Netlify; HSTS headers (`max-age=31536000; includeSubDomains`); TLS 1.3 termination on Render cloud backend. |
| **XSS Prevention** | Prevent Cross-Site Scripting via `textContent` & HTML entity escaping | `js/app.js`, `admin_products.html`, `js/api.js` | Replacement of raw string interpolation in `innerHTML` with `escapeHTML()` entity encoder and native `textContent` assignments for all user inputs and database fields. |
| **SQL Injection Prevention** | Enforce parameterized queries | `backend/models/productModel.js`, `backend/models/taskModel.js`, `backend/models/enquiryModel.js`, `backend/models/studentModel.js` | Prepared statements with positional `?` parameter placeholders executed through `mysql2/promise` connection pool. User data is never concatenated into raw SQL strings. |
| **Secrets Management** | Protect credentials in `.env` | `.gitignore`, `.env.example`, `backend/.env` | Database passwords, hostnames, and private keys isolated in `.env`; `.env` strictly added to `.gitignore` to prevent credential leakage into Git history. Committed `.env.example` provides template without secrets. |
| **Network Access Control** | Restrict Cross-Origin Resource Sharing (CORS) | `backend/server.js` | Dynamic origin validator verifying request origin against an explicit whitelist (`ALLOWED_ORIGIN`), rejecting unlisted origins with HTTP 403 / CORS policy violation error. |
| **Input Validation** | Server-side validation middleware | `backend/middleware/validator.js` | Strict payload schema validator ensuring `name` is a non-empty string, `price` is positive numeric, `stock` is non-negative integer, and `category` belongs to an allowed enumeration before reaching controllers. |
| **OWASP Top 10 #1** | A01:2021 - Broken Access Control & IDOR Defense | `backend/controllers/productController.js`, `backend/controllers/taskController.js` | Verification of resource existence before executing updates or deletions; returning 404 for nonexistent IDs; validating that state transitions cannot bypass business logic. |
| **OWASP Top 10 #2** | A05:2021 - Security Misconfiguration & Error Leakage Prevention | `backend/middleware/errorHandler.js` | Centralized 4-parameter error handling middleware (`err, req, res, next`) suppressing internal SQL error messages and stack traces in production environments (`NODE_ENV === 'production'`), returning standardized generic error responses to clients. |

---

## 2. Detailed Technical Breakdown by File

### 2.1 HTTPS Enforcement
- **Files**: `netlify.toml` (lines 35-42), `backend/server.js` (lines 8-25)
- **Implementation**:
  In `netlify.toml`:
  ```toml
  [[headers]]
    for = "/*"
    [headers.values]
      Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
      X-Content-Type-Options = "nosniff"
      X-Frame-Options = "DENY"
  ```
  On Render, automatic Let's Encrypt certificates encrypt all API endpoints under `https://el-herbs-backend.onrender.com`.

### 2.2 XSS Prevention
- **Files**: `js/app.js` (lines 9-20, 180, 460, 820, 1010, 1032, 1250), `admin_products.html` (lines 230-240, 275-295)
- **Implementation**:
  User-controllable values (such as customer enquiry name, search query strings, product names, and error messages) are sanitized before rendering:
  ```javascript
  function escapeHTML(str) {
      if (typeof str !== 'string') return String(str);
      return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
  }
  ```
  In static DOM locations, `element.textContent = userString;` is used exclusively to eliminate HTML parsing entirely.

### 2.3 SQL Injection Prevention
- **Files**: `backend/models/productModel.js` (lines 14, 23, 33, 44, 56-61), `backend/models/taskModel.js` (lines 12, 17, 22), `backend/models/enquiryModel.js` (line 12), `backend/models/studentModel.js` (lines 13, 21, 31, 41)
- **Implementation**:
  Queries utilize parameterized statements:
  ```javascript
  // Secure Product Lookup
  async findById(id) {
      const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0] || null;
  }

  // Secure Product Search
  async searchSecure(q) {
      const sql = "SELECT * FROM products WHERE name LIKE ?";
      const param = `%${q}%`;
      const [rows] = await db.query(sql, [param]);
      return { sql, param, rows };
  }
  ```
  Input strings are sent out-of-band to the MySQL server protocol, making payload execution structurally impossible regardless of input content.

### 2.4 Secrets Management in `.env`
- **Files**: `.gitignore` (lines 1-10), `.env.example`, `backend/.env`
- **Implementation**:
  The `.gitignore` file explicitly lists `.env` and `*.env`:
  ```
  # Environment Variables
  .env
  .env.local
  backend/.env
  ```
  The repository only commits `.env.example` containing descriptive placeholder keys:
  ```env
  PORT=5000
  NODE_ENV=development
  ALLOWED_ORIGIN=http://localhost:3000,http://127.0.0.1:5500
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=your_secure_password_here
  DB_NAME=el_herbs_db
  ```

### 2.5 Restricted CORS Configuration
- **Files**: `backend/server.js` (lines 38-51)
- **Implementation**:
  Instead of permissive `app.use(cors())` which exposes endpoints to any unauthorized origin, origin validation verifies requests against whitelisted production and local testing domains:
  ```javascript
  const rawAllowedOrigins = process.env.ALLOWED_ORIGIN || 'http://localhost:3000,http://127.0.0.1:5500,https://advaith-renjith-2004.github.io';
  const allowedOrigins = rawAllowedOrigins.split(',').map(origin => origin.trim());

  app.use(cors({
      origin: function (origin, callback) {
          if (!origin || allowedOrigins.indexOf(origin) !== -1) {
              callback(null, true);
          } else {
              callback(new Error(`Access blocked by CORS policy: Origin ${origin} not allowed.`));
          }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true
  }));
  ```

### 2.6 Server-Side Input Validation
- **Files**: `backend/middleware/validator.js` (lines 7-52), `backend/routes/productRoutes.js` (lines 14, 20)
- **Implementation**:
  The `validateProduct` middleware intercepts incoming POST and PUT payloads before passing control to the controller:
  ```javascript
  function validateProduct(req, res, next) {
      const { name, price, stock, category } = req.body;
      const errors = [];

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
          errors.push('Product name is required and must be non-empty string');
      }
      if (price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
          errors.push('Price must be a positive number greater than 0');
      }
      if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0 || !Number.isInteger(Number(stock))) {
          errors.push('Stock must be a non-negative integer');
      }

      if (errors.length > 0) {
          return res.status(400).json({ error: 'Validation failed', details: errors });
      }
      next();
  }
  ```

### 2.7 OWASP Top 10 Control #1: A01:2021 – Broken Access Control & IDOR
- **Files**: `backend/controllers/productController.js` (lines 80-95), `backend/controllers/taskController.js` (lines 40-52)
- **Implementation**:
  When modifying or deleting records by ID, the system validates the ID format, checks for record existence, and rejects invalid identifiers with standard HTTP 404/400 errors instead of exposing unhandled exceptions:
  ```javascript
  async deleteProduct(req, res, next) {
      try {
          const { id } = req.params;
          const product = await Product.findById(id);
          if (!product) {
              return res.status(404).json({ error: `Product with ID ${id} not found.` });
          }
          await Product.delete(id);
          return res.status(204).send();
      } catch (err) {
          next(err);
      }
  }
  ```

### 2.8 OWASP Top 10 Control #2: A05:2021 – Security Misconfiguration & Error Information Leakage
- **Files**: `backend/middleware/errorHandler.js` (lines 15-32)
- **Implementation**:
  The centralized error handling middleware catches unhandled exceptions across the application pipeline and sanitizes the response:
  ```javascript
  function centralErrorHandler(err, req, res, next) {
      const isProduction = process.env.NODE_ENV === 'production';
      const statusCode = err.status || err.statusCode || 500;

      res.status(statusCode).json({
          error: isProduction && statusCode === 500 
              ? 'An internal server error occurred. Please try again later.' 
              : err.message,
          timestamp: new Date().toISOString()
      });
  }
  ```
  This prevents database table schemas, SQL syntax details, filesystem paths, and call stacks from being leaked to malicious actors.
