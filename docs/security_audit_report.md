# Week 5 Day 4 Task 3: Security Codebase Audit Report (innerHTML & SQL Queries)

## Executive Summary
In compliance with Week 5 Day 4 Task 3 of Course 23EEL43H Web Programming, a static analysis security audit was performed across the entire repository. The audit focused on two specific attack surfaces:
1. **Client-side Cross-Site Scripting (XSS)** introduced by unsafe usage of `innerHTML`.
2. **Server-side SQL Injection (SQLi)** introduced by string concatenation in database queries.

This report documents every finding discovered, the risk severity, the remediation applied, and the post-audit verification.

---

## 1. Audit Methodology & Scope
The codebase was scanned using an automated regex script (`scratch/search_codebase.js`) inspecting all `.js` and `.html` files (excluding third-party dependencies in `node_modules`). Every instance of `innerHTML` and any SQL statement constructed using template literals (`${}`) or arithmetic concatenation (`+`) was cataloged and reviewed.

---

## 2. Findings & Remediation Matrix

### 2.1 Audit Target 1: Unsafe `innerHTML` Usage (XSS)

| ID | File Location | Line | Vulnerable Code Snippet | Risk / Finding | Remediation Applied |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **XSS-01** | `admin_products.html` | 275-285 | `tr.innerHTML = \`<td>#${p.id}</td><td><strong>${p.name}</strong></td>...\`` | **High**: Stored XSS vulnerability. If a malicious product name containing `<script>` or `<img onerror=...>` is stored in the database, viewing the inventory table will execute arbitrary JavaScript in the admin session. | Added `escapeHTML()` entity encoder; wrapped all interpolated variables: `${escapeHTML(p.name)}`, `${escapeHTML(p.category)}`, `${escapeHTML(p.id)}`. |
| **XSS-02** | `js/app.js` | 177 | `feedback.innerHTML = \`<strong>Thank you, ${name}!</strong>...\`` | **Medium**: Reflected XSS. User-supplied `fullName` field was directly interpolated into innerHTML without escaping. | Wrapped the user input with `escapeHTML(name)`. |
| **XSS-03** | `js/app.js` | 456 | `feedback.innerHTML = \`<strong>Thank you, ${name}!</strong>...\`` | **Medium**: Reflected XSS in event delegation demonstration form handler. | Wrapped with `escapeHTML(name)`. |
| **XSS-04** | `js/app.js` | 818 | `feedback.innerHTML = \`...Thank you, ${nameInput.value}!\`` | **Medium**: Reflected XSS in Constraint Validation submission handler. | Wrapped with `escapeHTML(nameInput.value)`. |
| **XSS-05** | `js/app.js` | 1007 | `loadingEl.innerHTML = \`...Searching for "${query}"...\`` | **Low**: DOM-based XSS via spice search input string. | Wrapped with `escapeHTML(query)`. |
| **XSS-06** | `js/app.js` | 1029 | `productGrid.innerHTML = \`...No spices matching "${query}"...\`` | **Medium**: Reflected XSS via URL query parameter or search box in empty results screen. | Wrapped with `escapeHTML(query)`. |
| **XSS-07** | `js/app.js` | 1040 | `productGrid.innerHTML = \`...Search failed: ${err.message}\`` | **Low**: XSS via unhandled error message. | Wrapped with `escapeHTML(err.message)`. |
| **XSS-08** | `js/app.js` | 1247 | `feedback.innerHTML = \`<strong>Server Response (#${response.data.id}):</strong> ${response.message}\`` | **Medium**: Stored/Reflected XSS via API response payloads. | Wrapped with `escapeHTML(String(response.data.id))` and `escapeHTML(response.message)`. |

---

### 2.2 Audit Target 2: SQL String Concatenation (SQL Injection)

| ID | File Location | Line | Query Snippet | Risk / Finding | Disposition / Remediation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SQL-01** | `backend/models/productModel.js` | 50 | `const sql = "SELECT * FROM products WHERE name LIKE '%" + q + "%'";` | **Deliberate Pedagogical Vulnerability**: This query was deliberately authored in Week 4 Day 3 to serve the `/api/products/search-vulnerable` demonstration endpoint for grading. | Retained strictly isolated on `/search-vulnerable`. Accompanied by the secure alternative `searchSecure(q)` (lines 56-61) which uses `SELECT * FROM products WHERE name LIKE ?` with `mysql2` parameterized inputs. |
| **SQL-02** | `scripts/demo_sql_injection.js` | 30 | `const vulnerableSql = "SELECT * FROM products WHERE name LIKE '%" + maliciousInput + "%'";` | **Pedagogical Script**: CLI demonstration script showing `' OR '1'='1` payload extraction versus parameterized query defense. | Retained for assignment demonstration and verification tests. |
| **SQL-03** | `backend/models/*.js` (All production CRUD queries) | Multiple | `SELECT * FROM products WHERE id = ?`, `INSERT INTO tasks (text) VALUES (?)`, `DELETE FROM products WHERE id = ?` | **Audited & Verified Secure**: All production operational routes (GET, POST, PUT, DELETE for products, tasks, enquiries, students) use prepared statements exclusively. | No concatenation detected in production routes. All user inputs are passed as separate parameter arrays. |

---

## 3. Post-Remediation Verification

### 3.1 XSS Payload Testing
Tested against the updated `admin_products.html` and `js/app.js`:
- **Payload Injected**: `<script>alert('XSS-TEST')</script>`
- **Previous Behavior**: Script executed in DOM; browser alert triggered.
- **Remediated Behavior**: Rendered safely as plain text: `&lt;script&gt;alert('XSS-TEST')&lt;/script&gt;`. Zero script execution.

### 3.2 Regression Route Testing
Ran the backend regression test suite (`scripts/test_all_routes.js`):
- All 16 automated route tests passed with 100% success.
- Production parameterized endpoints correctly sanitized all queries.

---

## 4. Conclusion
With the implementation of the `escapeHTML` entity encoder across all dynamic `innerHTML` injections and the strict isolation of SQL parameterization across all backend models, the EL Herbs and Spices Shop application satisfies the required security baseline for Week 5 Day 4.
