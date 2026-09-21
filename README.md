# Assignment 2 – EL Herbs and Spices Shop

**Course:** 23EEL43H Web Programming  
**Branch:** Electrical & Computer Engineering (Seventh Semester B.Tech - 2026)  
**Institution:** Mar Baselios College of Engineering & Technology  
**Faculty:** Dr. Sheryl Arulini. A  
**Student Repository:** [assignment_2_web_programming](https://github.com/advaith-renjith-2004/assignment_2_web_programming)

---

## 🌿 About The Project

**EL Herbs and Spices Shop** is an end-to-end full-stack web application for an authentic organic spice boutique based in Nalanchira, Trivandrum. The platform features an interactive, responsive frontend paired with a modular Node.js & Express REST API backend.

This repository tracks the complete, day-by-day progression across:
- **Week 1 (Assignment # 2.a):** Website Setup, HTML Semantic Structure, CSS Grid & Flexbox, JavaScript Core Basics.
- **Week 2 (Assignment # 2.b):** DOM Manipulation, Event Handling, Dynamic Admin Task List with Event Delegation, Array/Object Methods, and Constraint Form Validation.
- **Week 3 (Assignment # 2.c):** JSON Data Stores, Fetch API, LocalStorage Cart Persistence, Async/Await with Loading States, Git Collaboration Workflows (`.gitignore`, SemVer `v0.1.0`), and Node.js Express REST API with custom middleware.

---

## 📁 Repository Architecture

```text
assignment_2_web_programming/
├── index.html              # Main customer storefront (semantic layout, live search, dynamic grid)
├── admin.html              # Admin portal (interactive task manager with event delegation & stats)
├── README.md               # Comprehensive course & submission documentation
├── .gitignore              # Dependency, OS, and log exclusion rules with documentation
├── css/
│   └── style.css           # Responsive stylesheet (Flexbox, CSS Grid, Box Model, animations)
├── js/
│   └── app.js              # Comprehensive frontend JavaScript logic (Weeks 1 to 3)
├── data/
│   └── products.json       # JSON catalog containing 8 spice products
├── images/                 # Spice photography & brand logo
│   ├── logo.jpg
│   ├── cardamom.jpg
│   ├── turmeric.jpg
│   ├── black_pepper.jpg
│   ├── cinnamon.jpg
│   ├── clove.jpg
│   ├── ginger_powder.jpg
│   ├── bay_leaf.jpg
│   └── nutmeg.jpg
├── notes/
│   └── git_collaboration.md # Git collaboration, conflict resolution, and SemVer v0.1.0 notes
└── backend/                # Node.js Express REST API
    ├── package.json        # Backend dependencies & npm scripts (start, dev)
    ├── package-lock.json
    └── server.js           # Express server with logging, CORS, /api/products, /api/tasks
```

---

## 🚀 Day-by-Day Implementation Breakdown

### 📌 Week 1 – Website Setup and JavaScript Basics (`Assignment # 2.a`)
- **Day 1 (Setup & HTML/CSS):** Folder structure configured; semantic `index.html` and `admin.html`; styling in `css/style.css` using Flexbox navbar, CSS Grid product catalog, and mobile media queries.
- **Day 2 (Variables, Data Types & Operators):** Linked `js/app.js`; declared shop variables using `var`, `let`, `const`; created `products` array of 8 objects; performed arithmetic, equality (`==` vs `===`), logical operations, 5% GST calculations, and documented `'10' + 5` vs `'10' - 5` type coercion.

---

### 📌 Week 2 – DOM, Events, Data and Form Validation (`Assignment # 2.b`)
- **Day 1 (DOM Manipulation):**
  - Added empty `#productGrid` container; implemented branding updater using `textContent`, `setAttribute`, and `classList.toggle`.
  - Implemented `renderProducts(list)` creating elements with `createElement`, populating details with `textContent`, and applying `.out-of-stock` styling when `stock === 0`.
  - Corrected DOM selector errors and documented `textContent` vs `innerHTML`.
- **Day 2 (Event Handling):**
  - Handled cart button clicks with toast message, product card hover with `.zoom` scale class, and keyboard search (`Enter` to query, `Escape` to clear).
  - Logged event objects (`type`, `target`, `key`) to console.
  - Implemented `event.preventDefault()` on form submit and documented why `addEventListener` is preferred over inline `onclick`.
- **Day 3 (Dynamic List with Event Delegation):**
  - Built shop task manager in `admin.html` with `#taskInput`, `#addTaskBtn`, `#taskList`, and `#taskCounter`.
  - Used single parent event listener on `#taskList` (**Event Delegation**) to handle task deletion.
  - Corrected string concatenation bugs in counters and dynamic deletion handlers.
- **Day 4 (Arrays and Objects):**
  - Processed student scores: `map()` for names, `filter()` for passing students, `reduce()` for average mark, `find()` for topper, `some()` & `every()` for grade conditions, and `Object.entries()`.
  - Repeated `map()`, `filter()`, `reduce()` on `products` array to calculate total inventory value.
  - Implemented live simultaneous dual filtering (search input + category dropdown).
- **Day 5 (Form Validation):**
  - Customer enquiry form with `novalidate`, password confirmation, regex email, and 10-digit phone validation.
  - Constraint Validation API integration using `checkValidity()` and `setCustomValidity()`.
  - Real-time `input` validation feedback and XSS safe rendering demonstration with `textContent`.

---

### 📌 Week 3 – JSON, Fetch, Git Collaboration and Express Server (`Assignment # 2.c`)
- **Day 1 (JSON & Fetch API):**
  - Moved product catalog into `data/products.json`; loaded data via `fetch()` with `response.ok` checking.
  - Persisted shopping cart in `localStorage` using `JSON.stringify()` and restored via `JSON.parse()` in `try...catch`.
  - Documented JSON syntax error cases (single quotes, trailing commas, unquoted keys) and verified 404 response handling.
- **Day 2 (Async/Await & Error Handling):**
  - Refactored `loadProducts()` using `async`/`await` with `try`, `catch`, and `finally` loading spinner management.
  - Created asynchronous product search with "No matches found" feedback and button re-enabling in `finally`.
  - Demonstrated runtime exception catches (`TypeError` and `ReferenceError`) and documented DevTools debugging techniques.
- **Day 3 (Git Collaboration Workflow):**
  - Added documented `.gitignore` file (`node_modules/`, `.env`, `*.log`, `.DS_Store`, `Thumbs.db`).
  - Documented feature branching, pull request reviews, and merge conflict resolution.
  - Created and pushed annotated tag `v0.1.0` with Semantic Versioning documentation.
- **Day 4 (Node.js & Express Setup):**
  - Initialized Express backend in `backend/` with `npm start` and `npm run dev` scripts.
  - Created GET `/api/health` and GET `/api/products` (status 200).
  - Created POST `/api/products` reading `req.body` (status 201).
  - Documented browser CORS error observation.
- **Day 5 (REST API & Middleware Pipeline):**
  - Implemented strict middleware pipeline: Custom Logger -> `express.json()` -> `cors` origin whitelist -> Routes -> 404 handler -> Central 4-parameter error handler.
  - Built `/api/tasks` CRUD endpoints (GET list 200, POST with validation 201/400, DELETE 204/404).
  - Documented corrections for buggy server implementations.

---

## 🏃‍♂️ How to Run & Verify

### 1. Running the Frontend
- **Live GitHub Pages:** [https://advaith-renjith-2004.github.io/assignment_2_web_programming/](https://advaith-renjith-2004.github.io/assignment_2_web_programming/)
- **Local Browser:** Open `index.html` or `admin.html` directly in any web browser.

### 2. Running the Backend Server
```bash
cd backend
npm install
npm start
```
The server will start on `http://localhost:5000`:
- Health Check: `curl http://localhost:5000/api/health`
- Products Catalog: `curl http://localhost:5000/api/products`
- Task Endpoints: `curl http://localhost:5000/api/tasks`

---

## 📜 Complete Git Commit History

```text
d057d86 Week 3 - Day 5: REST API middleware pipeline (logger, cors, 404, error handler) and tasks CRUD
f0a71c0 Week 3 - Day 4: Node.js Express server setup with GET/POST routes and scripts
4c90780 Week 3 - Day 3: Git collaboration workflow, .gitignore, conflict resolution demo, and v0.1.0 tag
d7231aa Week 3 - Day 2: Async/await fetch with loading state, search error handling, and runtime error catches
3ab4547 Week 3 - Day 1: JSON & Fetch API integration, localStorage cart persistence, and 404 error demo
a3a9f7b Week 2 - Day 5: Form validation with Constraint Validation API, regex, and XSS-safe rendering
94fbf8c Week 2 - Day 4: Array methods (map, filter, reduce, find), object manipulation, and live dual filter
dbc7833 Week 2 - Day 3: Dynamic admin task list with event delegation and counter
f28ce85 Week 2 - Day 2: Event handling for cart, hover zoom, keyboard search, and preventDefault
33caa40 Week 2 - Day 1: DOM Manipulation, dynamic product rendering and out-of-stock styles
924cee9 Day 2 – Implemented JavaScript variables, products array, operators, GST calculation and type coercion explanations
c1c8c73 Day 1 – Added CSS styling with Flexbox navigation, CSS Grid product layout, box model and mobile responsiveness
f2b6756 Day 1 – Created folder structure, HTML pages (index.html & admin.html), README.md, data and images
```
