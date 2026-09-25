# Assignment 2 – EL Herbs and Spices Shop

**Course:** 23EEL43H Web Programming  
**Branch:** Electrical & Computer Engineering (Seventh Semester B.Tech - 2026)  
**Institution:** Mar Baselios College of Engineering & Technology  
**Faculty:** Dr. Sheryl Arulini. A  
**Student Repository:** [assignment_2_web_programming](https://github.com/advaith-renjith-2004/assignment_2_web_programming)  
**Live Frontend:** [https://advaith-renjith-2004.github.io/assignment_2_web_programming/](https://advaith-renjith-2004.github.io/assignment_2_web_programming/)

---

## 🌿 About The Project

**EL Herbs and Spices Shop** is an end-to-end full-stack web application for an authentic organic spice boutique based in Nalanchira, Trivandrum. The platform features an interactive, responsive frontend paired with a secure Node.js & Express REST API backend and a MySQL relational database.

This repository tracks the complete, day-by-day progression across:
- **Week 1 (Assignment # 2.a):** Website Setup, HTML Semantic Structure, CSS Grid & Flexbox, JavaScript Core Basics.
- **Week 2 (Assignment # 2.b):** DOM Manipulation, Event Handling, Dynamic Admin Task List with Event Delegation, Array/Object Methods, and Constraint Form Validation.
- **Week 3 (Assignment # 2.c):** JSON Data Stores, Fetch API, LocalStorage Cart Persistence, Async/Await with Loading States, Git Collaboration Workflows (`.gitignore`, SemVer `v0.1.0`), and Node.js Express REST API with custom middleware.
- **Week 4 (Assignment # 2.d):** Full REST API, Database Integration (MySQL), Environment Variables (`dotenv`), Input Validation Middleware, and Application Security (SQL Injection Defense with Parameterized Queries).

---

## 📁 Repository Architecture

```text
assignment_2_web_programming/
├── index.html              # Customer storefront (live search, dual filter, enquiry form)
├── admin.html              # Admin portal (server-synced task board with event delegation)
├── admin_products.html     # Dedicated Product REST Admin UI (table, edit prefill, PUT/DELETE)
├── api.js                  # Frontend API client library (tasks, products, enquiries)
├── schema.sql              # Database initialization DDL (products, tasks, enquiries, students)
├── README.md               # Comprehensive course & submission documentation
├── .gitignore              # Dependency, OS, and log exclusion rules with documentation
├── .env.example            # Environment variables template for team setup
├── css/
│   └── style.css           # Responsive stylesheet (Flexbox, CSS Grid, Box Model, animations)
├── js/
│   ├── api.js              # Client API helper module (fetch functions with JSON headers)
│   └── app.js              # Comprehensive frontend JavaScript logic (Weeks 1 to 4)
├── data/
│   └── products.json       # JSON catalog containing 8 spice products
├── db/
│   ├── schema.sql          # SQL schema definition for products, tasks, enquiries, students
│   └── connection.js       # MySQL connection pool module using environment variables
├── docs/
│   ├── sql_vs_nosql.md     # SQL vs MongoDB syntax mapping, CRUD table, and architecture essay
│   ├── sql_injection_demonstration.md # In-depth SQL injection vulnerability & mitigation report
│   └── screenshots/
│       ├── sql_injection_before_after.svg # Vector terminal screenshot proof (before vs after)
│       └── sql_injection_comparison.html  # Interactive visual comparison dashboard
├── notes/
│   ├── git_collaboration.md           # Branching, conflict resolution, and SemVer v0.1.0 notes
│   ├── day2_curl_tests.md             # Recorded HTTP status codes for 5 product REST routes
│   └── backend_validation_security.md # Input validation middleware & why client validation fails
├── scripts/
│   ├── test_products.sh        # cURL test suite for 5 product REST routes (success & failures)
│   ├── test_validation_curl.sh # cURL tests verifying backend validation rejection (HTTP 400)
│   ├── db_test.js              # Node.js database connectivity & table row printer script
│   └── demo_sql_injection.js   # Automated SQL injection attack vs defense demonstration
└── backend/                    # Node.js Express REST API
    ├── package.json            # Dependencies (express, cors, dotenv, mysql2) & scripts
    ├── package-lock.json
    ├── .env.example            # Backend env template
    ├── server.js               # Full Express server with middleware, db pool, REST routes
    └── db/
        ├── connection.js       # MySQL2 connection pool with resilient transactional adapter
        └── test_connection.js  # Database test script
```

---

## 🚀 Day-by-Day Implementation Breakdown

### 📌 Week 1 – Website Setup and JavaScript Basics (`Assignment # 2.a`)
- **Day 1 (Setup & HTML/CSS):** Folder structure configured; semantic `index.html` and `admin.html`; styling in `css/style.css` using Flexbox navbar, CSS Grid product catalog, and mobile media queries.
- **Day 2 (Variables, Data Types & Operators):** Linked `js/app.js`; declared shop variables using `var`, `let`, `const`; created `products` array of 8 objects; performed arithmetic, equality (`==` vs `===`), logical operations, 5% GST calculations, and documented `'10' + 5` vs `'10' - 5` type coercion.

---

### 📌 Week 2 – DOM, Events, Data and Form Validation (`Assignment # 2.b`)
- **Day 1 (DOM Manipulation):** Added empty `#productGrid` container; implemented branding updater using `textContent`, `setAttribute`, and `classList.toggle`; implemented `renderProducts(list)` with `.out-of-stock` styling; documented `textContent` vs `innerHTML`.
- **Day 2 (Event Handling):** Cart button clicks with toast message, product card hover with `.zoom` scale class, keyboard search (`Enter` to query, `Escape` to clear); `event.preventDefault()` on form submit; documented why `addEventListener` > inline `onclick`.
- **Day 3 (Dynamic List with Event Delegation):** Shop task manager in `admin.html` with `#taskInput`, `#addTaskBtn`, `#taskList`, and `#taskCounter`; event delegation on `#taskList`; corrected counter string concatenation bugs.
- **Day 4 (Arrays and Objects):** Student scores processing with `map()`, `filter()`, `reduce()`, `find()`, `some()`, `every()`, `Object.entries()`; inventory total valuation; live simultaneous dual filtering (search input + category dropdown).
- **Day 5 (Form Validation):** Customer enquiry form with `novalidate`, password confirmation, regex email, 10-digit phone; Constraint Validation API integration; XSS safe rendering with `textContent`.

---

### 📌 Week 3 – JSON, Fetch, Git Collaboration and Express Server (`Assignment # 2.c`)
- **Day 1 (JSON & Fetch API):** Product catalog in `data/products.json`; loaded data via `fetch()` with `response.ok`; shopping cart in `localStorage` with `JSON.stringify()` / `JSON.parse()`; JSON syntax errors documented.
- **Day 2 (Async/Await & Error Handling):** `loadProducts()` using `async`/`await` with `try`/`catch`/`finally` loading spinner; async product search; runtime error catches (`TypeError`, `ReferenceError`).
- **Day 3 (Git Collaboration Workflow):** Documented `.gitignore` file; branching, pull request reviews, and merge conflict resolution notes; created annotated tag `v0.1.0` with Semantic Versioning documentation.
- **Day 4 (Node.js & Express Setup):** Express backend in `backend/` with `npm start` and `npm run dev`; GET `/api/health`, GET `/api/products` (200), POST `/api/products` (201); CORS error documented.
- **Day 5 (REST API & Middleware Pipeline):** Middleware pipeline (Logger -> `express.json()` -> `cors` -> Routes -> 404 -> Error handler); `/api/tasks` CRUD endpoints (200, 201, 204, 400, 404); server bugs documented.

---

### 📌 Week 4 – REST API, Databases and Security (`Assignment # 2.d`)
- **Day 1 – Connecting the Frontend to the Backend:**
  - Written `api.js` client helper with `getTasks()`, `addTask(text)`, `deleteTask(id)`, and `submitEnquiry(enquiryData)` using `fetch`, `Content-Type: application/json` headers, and `JSON.stringify()`.
  - Refactored Admin Task Board to load tasks from server on page load, save new tasks on server before displaying, and delete on server before list refresh.
  - Linked customer enquiry form to `POST /api/enquiries` and rendered live server confirmation on page.
  - Documented bug fixes for missing JSON headers, unstringified bodies, and unawaited `res.json()`.
- **Day 2 – Complete REST API for Products:**
  - Implemented all 5 REST routes for `/api/products`: GET all (200), GET by ID (200/400/404), POST (201/400), PUT (200/400/404), and DELETE (204/400/404).
  - Built dedicated `admin_products.html` showing all products in a live table, add product form, Edit button prefilling the form for PUT updates, and Delete button using event delegation.
  - Authored automated cURL test suite `scripts/test_products.sh` and documented status codes in `notes/day2_curl_tests.md`.
  - Corrected route defect where `req.params.id` was compared using strict `===` against numbers and missing 404 status.
- **Day 3 – Environment Variables and Security:**
  - Installed and configured `dotenv`; created `.env` with `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `ALLOWED_ORIGIN`.
  - Provided `.env.example` template and verified `.env` is ignored by Git (`git status --ignored`).
  - Implemented `validateProduct` middleware enforcing non-empty name, price > 0, and non-negative stock (returning HTTP 400 Bad Request).
  - Tested invalid inputs directly via cURL (`scripts/test_validation_curl.sh`) and documented why client-only validation is insufficient in `notes/backend_validation_security.md`.
- **Day 4 – SQL and NoSQL Basics:**
  - Created `schema.sql` (and `db/schema.sql`) defining `products`, `tasks`, `enquiries`, and `students` tables with primary keys, checks, and seed data.
  - Authored SQL statements demonstrating INSERT, SELECT with WHERE, UPDATE, and DELETE.
  - Represented the same student record as an SQL table row and as a MongoDB JSON document in `docs/sql_vs_nosql.md`.
  - Side-by-side CRUD syntax comparison table between MySQL and MongoDB.
  - Architectural essay analyzing schema, flexibility, consistency (ACID vs BASE), and justifying SQL choice for e-commerce orders.
- **Day 5 – Connecting Node.js to MySQL & SQL Injection Defense:**
  - Installed `mysql2` and created `backend/db/connection.js` exporting a connection pool configured via `process.env`.
  - Created `scripts/db_test.js` to connect to database and print table rows with robust error handling.
  - Rewrote all 5 product routes to execute database queries with async/await and parameterized placeholders (`?`).
  - Demonstrated SQL Injection attack using `' OR '1'='1` on vulnerable string-concatenated route vs complete mitigation using parameterized queries.
  - Replicated all 5 CRUD routes for a `students` resource (`/api/students`).
  - Generated visual terminal screenshot comparison in `docs/screenshots/sql_injection_before_after.svg`.

---

## 🛡️ SQL Injection Demonstration: Before vs. After

### The Attack Payload:
```text
' OR '1'='1
```

### Before Mitigation (Vulnerable Route: String Concatenation):
- **Endpoint:** `GET /api/products/search-vulnerable?q=' OR '1'='1`
- **Constructed SQL:** `SELECT * FROM products WHERE name LIKE '%' OR '1'='1%'`
- **Exploitation:** Because `'1'='1'` is always true, the `WHERE` condition passes for every record. **All 8 product records are leaked**, compromising confidential data.

### After Mitigation (Secure Route: Parameterized Queries):
- **Endpoint:** `GET /api/products/search?q=' OR '1'='1`
- **Prepared SQL:** `SELECT * FROM products WHERE name LIKE ?` with parameter `["%' OR '1'='1%"]`
- **Mitigation:** The database engine treats the input strictly as literal string characters. **Zero records match**, preserving database integrity.

> **Visual Screenshots:**
> - [Vector Terminal Screenshot (SVG)](file:///d:/assignment_2_web_programming/docs/screenshots/sql_injection_before_after.svg)
> - [Interactive HTML Comparison Report](file:///d:/assignment_2_web_programming/docs/screenshots/sql_injection_comparison.html)
> - [In-Depth Security Analysis Report](file:///d:/assignment_2_web_programming/docs/sql_injection_demonstration.md)

---

## 📡 REST API Endpoint Reference

| Method | Endpoint | Description | Status Codes |
|:---|:---|:---|:---:|
| `GET` | `/api/health` | Service health monitor | `200` |
| `GET` | `/api/products` | Retrieve all spice products | `200` |
| `GET` | `/api/products/:id` | Retrieve single product by ID | `200`, `400`, `404` |
| `POST` | `/api/products` | Add new product (with `validateProduct`) | `201`, `400` |
| `PUT` | `/api/products/:id` | Update product by ID (with `validateProduct`) | `200`, `400`, `404` |
| `DELETE` | `/api/products/:id` | Delete product by ID | `204`, `400`, `404` |
| `GET` | `/api/products/search-vulnerable?q=` | Vulnerable search (concatenation demo) | `200` |
| `GET` | `/api/products/search?q=` | Secure search (parameterized query) | `200` |
| `GET` | `/api/tasks` | Retrieve all shop tasks | `200` |
| `POST` | `/api/tasks` | Create new shop task | `201`, `400` |
| `DELETE` | `/api/tasks/:id` | Delete task by ID | `204`, `404` |
| `GET` | `/api/enquiries` | Retrieve customer enquiries | `200` |
| `POST` | `/api/enquiries` | Submit customer enquiry | `201`, `400` |
| `GET` | `/api/students` | Retrieve all students | `200` |
| `GET` | `/api/students/:id` | Retrieve student by ID | `200`, `400`, `404` |
| `POST` | `/api/students` | Create new student | `201`, `400` |
| `PUT` | `/api/students/:id` | Update student by ID | `200`, `400`, `404` |
| `DELETE` | `/api/students/:id` | Delete student by ID | `204`, `400`, `404` |

---

## 🏃‍♂️ How to Run & Verify

### 1. Running Frontend
- **Storefront:** Open `index.html` in browser.
- **Task Dashboard:** Open `admin.html` in browser.
- **Product REST Admin:** Open `admin_products.html` in browser.

### 2. Starting Backend Server
```bash
cd backend
npm install
npm start
```
The server will start on port `5000` (or `PORT` defined in `.env`).

### 3. Running Verification Scripts
```bash
# Test database connection and print table rows
node scripts/db_test.js

# Run automated SQL Injection demonstration
node scripts/demo_sql_injection.js

# Run REST API product routes cURL tests
bash scripts/test_products.sh

# Run direct backend validation tests
bash scripts/test_validation_curl.sh
```

---

## 📜 Complete Git Commit History

| Commit Hash | Commit Message |
|:---|:---|
| `bd71166` | **Week 4 - Day 5:** MySQL database integration with connection pool, parameterized CRUD queries, SQL injection demo & defense |
| `e97e316` | **Week 4 - Day 4:** Database schema design in SQL, CRUD operations, and SQL vs NoSQL comprehensive comparison |
| `6870310` | **Week 4 - Day 3:** Environment variables with dotenv, product validation middleware, and security documentation |
| `7d3a5c4` | **Week 4 - Day 2:** Complete REST API for products with 5 CRUD routes, product admin UI, and curl route tests |
| `f9d8c4f` | **Week 4 - Day 1:** Connect frontend to backend with api.js, server-backed task board, and enquiry submission |
| `66e09f8` | **Week 3 - Day 5:** Updated README.md with complete Weeks 1-3 documentation and full commit history |
| `d057d86` | **Week 3 - Day 5:** REST API middleware pipeline (logger, cors, 404, error handler) and tasks CRUD |
| `f0a71c0` | **Week 3 - Day 4:** Node.js Express server setup with GET/POST routes and scripts |
| `4c90780` | **Week 3 - Day 3:** Git collaboration workflow, .gitignore, conflict resolution demo, and v0.1.0 tag |
| `d7231aa` | **Week 3 - Day 2:** Async/await fetch with loading state, search error handling, and runtime error catches |
| `3ab4547` | **Week 3 - Day 1:** JSON & Fetch API integration, localStorage cart persistence, and 404 error demo |
| `a3a9f7b` | **Week 2 - Day 5:** Form validation with Constraint Validation API, regex, and XSS-safe rendering |
| `94fbf8c` | **Week 2 - Day 4:** Array methods (map, filter, reduce, find), object manipulation, and live dual filter |
| `dbc7833` | **Week 2 - Day 3:** Dynamic admin task list with event delegation and counter |
| `f28ce85` | **Week 2 - Day 2:** Event handling for cart, hover zoom, keyboard search, and preventDefault |
| `33caa40` | **Week 2 - Day 1:** DOM Manipulation, dynamic product rendering and out-of-stock styles |
| `924cee9` | **Day 2 –** Implemented JavaScript variables, products array, operators, GST calculation and type coercion explanations |
| `c1c8c73` | **Day 1 –** Added CSS styling with Flexbox navigation, CSS Grid product layout, box model and mobile responsiveness |
| `f2b6756` | **Day 1 –** Created folder structure, HTML pages (index.html & admin.html), README.md, data and images |
