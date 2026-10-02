# Week 5 - Day 1: Static Hosting vs Dynamic Hosting Architecture Comparison

**Course:** 23EEL43H Web Programming  
**Topic:** Web Infrastructure, Hosting Paradigms, and Cloud Deployment Mapping  

---

## 1. Overview of Hosting Paradigms

Web applications consist of different operational layers: static presentation assets, backend server execution runtimes, and persistent data storage. Deploying an application effectively requires choosing the appropriate hosting model for each layer.

---

## 2. Comprehensive Comparison Matrix (Task 3)

| Dimension | Static Hosting (e.g., GitHub Pages, Netlify, Cloudflare Pages, Vercel) | Dynamic Hosting (e.g., Render, Railway, AWS EC2, Heroku, DigitalOcean) |
|:---|:---|:---|
| **What is Served** | Pre-built, static client files directly: HTML, CSS, client-side JavaScript, images (PNG, JPG, SVG), JSON files, and web fonts. | Dynamically generated HTTP responses, JSON payloads from REST/GraphQL endpoints, server-rendered HTML (SSR), or web socket streams. |
| **Whether Code Runs on the Server** | **No server-side user code runs.** The web server acts solely as a high-speed file server or Content Delivery Network (CDN) edge cache distributing fixed files upon request. | **Yes.** A continuous runtime process (e.g., Node.js / Express, Python / Django, Java / Spring) executes server-side code on every incoming HTTP request. |
| **Need for a Database** | **No direct database connection.** Static hosting platforms do not connect directly to relational or NoSQL database servers. Data fetching occurs via client-side `fetch()` calls to external APIs. | **Typically required.** Connects to persistent SQL (MySQL, PostgreSQL) or NoSQL (MongoDB, Redis) databases to perform ACID transactions, queries, authentication, and writes. |
| **Infrastructure & Scalability** | **Extremely high scalability via global CDNs.** Static files are cached on edge nodes worldwide (Cloudflare, Fastly). Zero latency cold starts; easily handles millions of concurrent visits. | **Requires compute instances & memory.** Scaled vertically (upgrading CPU/RAM) or horizontally (adding container replicas behind load balancers). Free tiers often experience cold-start sleep. |
| **Security Surface** | **Minimal.** No server-side code to exploit, no open database ports, no remote code execution (RCE) vectors, and no backend environment secrets exposed on edge servers. | **Substantial.** Requires operating system / container patches, input validation middleware, SQL injection defense, CORS policy enforcement, rate limiting, and secret management. |
| **Cost** | **Virtually Free / Extremely Low.** GitHub Pages, Netlify, and Cloudflare Pages offer generous free tiers with unlimited bandwidth or large monthly quotas (100GB+). | **Moderate to High.** Dynamic hosting consumes continuous compute resources (CPU/RAM hours). Free tiers have sleep timers; production clusters typically cost $7 to $100+/month. |

---

## 3. Deployment Mapping for EL Herbs and Spices Shop Project

To achieve optimal performance, zero cost, and strict security isolation, the EL Herbs and Spices Shop architecture is divided across specialized hosting tiers:

```text
+-------------------------------------------------------------------------+
|                          TIER 1: STATIC FRONTEND                        |
|                                                                         |
|  Host: GitHub Pages / Netlify                                           |
|  Assets: index.html, admin.html, admin_products.html, css/, js/, images |
|  Role: Global CDN delivery of shop UI, spice photography, CSS styles    |
+-------------------------------------------------------------------------+
                                    |
                                    | HTTPS REST Calls (fetch / JSON)
                                    v
+-------------------------------------------------------------------------+
|                         TIER 2: DYNAMIC BACKEND                         |
|                                                                         |
|  Host: Render / Railway / Local Node.js                                 |
|  Assets: server.js, Express routes, controllers, models, middleware     |
|  Role: Request authentication, validation, business logic, CORS gate    |
+-------------------------------------------------------------------------+
                                    |
                                    | Parameterized SQL Queries (TCP/SSL)
                                    v
+-------------------------------------------------------------------------+
|                         TIER 3: CLOUD DATABASE                          |
|                                                                         |
|  Host: Supabase / MySQL Cloud / Aiven / Local MySQL                     |
|  Assets: schema.sql (products, tasks, enquiries, students tables)       |
|  Role: ACID transactional storage, referential integrity, persistence   |
+-------------------------------------------------------------------------+
```

### Allocation Summary:

1. **Frontend (`index.html`, `admin.html`, `admin_products.html`, `css/`, `js/`, `images/`):**
   - **Assigned Host:** **Static Hosting (GitHub Pages & Netlify)**
   - **Rationale:** The storefront and administrative portals are static HTML5/CSS3/ES6 applications. Deploying to Netlify/GitHub Pages delivers instant worldwide loading via CDN edges, automatic HTTPS SSL certificates, zero server maintenance costs, and built-in Git deployment triggers.

2. **Backend API (`backend/server.js`, `routes/`, `controllers/`, `models/`, `middleware/`):**
   - **Assigned Host:** **Dynamic Hosting (Render / Railway / Node.js Server)**
   - **Rationale:** The Express server processes REST API routes (`/api/products`, `/api/tasks`, `/api/enquiries`, `/api/students`), executes input validation middleware (`validateProduct`), securely hides database credentials in `.env`, and coordinates database queries.

3. **Database Storage (`schema.sql`):**
   - **Assigned Host:** **Managed Cloud Database (Supabase / MySQL Cloud / Aiven)**
   - **Rationale:** Ensures relational data persistence, primary key indexing, auto-increment IDs, check constraints, and continuous availability decoupled from the application server.
