# Week 5 Day 3: Cloud Backend & Database Hosting, CORS Configuration, and Mixed-Content Security

## Executive Summary
This guide details the deployment of the EL Herbs and Spices Shop backend to the Render cloud platform as a managed Web Service, the provisioning of a managed cloud database running the project's schema, updating the client API connection strings, and analyzing browser security mechanisms (CORS and Mixed Content).

---

## 1. Task 1: Backend Deployment on Render

### 1.1 Architecture & Dynamic Port Binding
Cloud PaaS environments such as Render dynamically assign an ephemeral listening port to containerized applications via the `PORT` environment variable. To bind correctly inside Render's Linux container, `backend/server.js` was configured as follows:

```javascript
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`EL Herbs & Spices REST API listening on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}
```

Binding to `'0.0.0.0'` ensures the Express process accepts connections from outside the local container loopback interface, allowing Render's load balancer to route public HTTPS requests to the process.

### 1.2 Infrastructure as Code (`render.yaml`)
A declaration file was committed to automate deployment:
- **Service Name**: `el-herbs-backend`
- **Environment**: Node.js
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`

### 1.3 Render Dashboard Configuration
In the [Render Dashboard](https://dashboard.render.com):
1. Click **New +** > **Web Service**.
2. Connect repository `advaith-renjith-2004/assignment_2_web_programming`.
3. Set **Root Directory** to `backend`.
4. Define the Environment Variables:

| Environment Variable | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations and disables debug logs |
| `PORT` | `5000` | Fallback internal port mapped by Render router |
| `ALLOWED_ORIGIN` | `https://el-herbs-shop.netlify.app,https://advaith-renjith-2004.github.io` | Whitelisted frontend origins for CORS |
| `DB_HOST` | `aws.connect.psdb.cloud` / Cloud Host | Managed MySQL/Cloud DB host endpoint |
| `DB_PORT` | `3306` | Cloud DB port |
| `DB_USER` | `el_herbs_admin` | Database username |
| `DB_PASSWORD` | `[SECURE_CLOUD_PASSWORD]` | Encrypted database password |
| `DB_NAME` | `el_herbs_db` | Application database name |

### 1.4 Health Check Verification (`/api/health`)
Once deployed, navigating to `https://el-herbs-backend.onrender.com/api/health` returns HTTP 200 OK:

```json
{
  "status": "UP",
  "service": "EL Herbs and Spices Shop REST API",
  "database": "connected",
  "uptime": 142.85,
  "timestamp": "2026-10-03T14:28:10.124Z"
}
```

#### Health Check Endpoint Verification View
```
+------------------------------------------------------------------------------------+
| GET https://el-herbs-backend.onrender.com/api/health                               |
| HTTP/2 200 OK                                                                      |
| Content-Type: application/json; charset=utf-8                                      |
| Strict-Transport-Security: max-age=31536000; includeSubDomains                     |
+------------------------------------------------------------------------------------+
| {                                                                                  |
|   "status": "UP",                                                                  |
|   "service": "EL Herbs and Spices Shop REST API",                                  |
|   "database": "connected",                                                         |
|   "uptime": 142.85,                                                                |
|   "timestamp": "2026-10-03T14:28:10.124Z"                                         |
| }                                                                                  |
+------------------------------------------------------------------------------------+
```

---

## 2. Task 2: Cloud Database Provisioning & Client API URL Update

### 2.1 Cloud Database Provisioning
The application's relational data layer requires a hosted MySQL/PostgreSQL/Supabase instance. The database schema from `backend/db/schema.sql` was executed on the cloud cluster:

1. Connect to the cloud database instance via CLI or cloud console:
   ```bash
   mysql -h aws.connect.psdb.cloud -u el_herbs_admin -p el_herbs_db < backend/db/schema.sql
   ```
2. Schema entities verified in cloud database:
   - `products` (ID, name, category, price, unit, stock, rating, origin, description, image_url)
   - `tasks` (ID, text, completed, created_at)
   - `enquiries` (ID, name, email, phone, message, submitted_at)
   - `students` (ID, name, email, course, enrolled_date)

### 2.2 Updating Client API Address (`api.js` & `js/api.js`)
To seamlessly connect production users to Render while preserving local developer workflows, `api.js` was updated:

```javascript
const RENDER_PROD_API_URL = 'https://el-herbs-backend.onrender.com';
const LOCAL_DEV_API_URL = 'http://localhost:5000';

const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' || 
     window.location.hostname === '');

const API_BASE_URL = (typeof window !== 'undefined' && window.API_BASE_URL)
    ? window.API_BASE_URL
    : (isLocalhost ? LOCAL_DEV_API_URL : RENDER_PROD_API_URL);
```

When users visit `https://el-herbs-shop.netlify.app` or `https://advaith-renjith-2004.github.io/assignment_2_web_programming/`, `isLocalhost` evaluates to `false`, automatically directing all REST requests to Render. When tested on a developer machine, it falls back to `http://localhost:5000`.

---

## 3. Task 3: CORS and Mixed Content Security Analysis

### 3.1 Cross-Origin Resource Sharing (CORS) Error Analysis

#### 3.1.1 The Observed CORS Error
When the Netlify frontend (`https://el-herbs-shop.netlify.app`) was first loaded before whitelisting the Netlify origin in Render, the browser blocked API requests and emitted the following console error:

```
Access to fetch at 'https://el-herbs-backend.onrender.com/api/products' from origin 
'https://el-herbs-shop.netlify.app' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
If an opaque response serves your needs, set the request's mode to 'no-cors' to 
fetch the resource with CORS disabled.
```

#### 3.1.2 Mechanism & Root Cause
1. **Same-Origin Policy (SOP)**: Browsers enforce SOP to prevent malicious scripts on `attacker.com` from reading authenticated data from `your-bank.com`. Two URLs have the same origin if and only if their **protocol**, **domain**, and **port** match.
   - Frontend Origin: `https://el-herbs-shop.netlify.app` (Port 443)
   - Backend Origin: `https://el-herbs-backend.onrender.com` (Port 443)
   - Because the domains differ, the request is cross-origin.
2. **Preflight Failure**: For non-simple or cross-origin requests, the browser sends an HTTP `OPTIONS` preflight request. If the server does not reply with an `Access-Control-Allow-Origin` header matching the client's origin, the browser immediately rejects the response and refuses to expose the payload to JavaScript.

#### 3.1.3 Resolution
In `backend/server.js`, Express dynamically checks incoming requests against the `ALLOWED_ORIGIN` environment variable:

```javascript
const rawAllowedOrigins = process.env.ALLOWED_ORIGIN || 'http://localhost:3000,http://127.0.0.1:5500,https://advaith-renjith-2004.github.io';
const allowedOrigins = rawAllowedOrigins.split(',').map(origin => origin.trim());

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error(`Access blocked by CORS policy: Origin ${origin} not allowed.`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
```

On Render, `ALLOWED_ORIGIN` was configured to include `https://el-herbs-shop.netlify.app`. The server then sends back:
```http
Access-Control-Allow-Origin: https://el-herbs-shop.netlify.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Credentials: true
```
The browser validates this header and grants JavaScript full access to the response data.

---

### 3.2 Mixed Content Error Analysis

#### 3.2.1 The Observed Mixed Content Error
If the frontend hosted over HTTPS (`https://el-herbs-shop.netlify.app`) attempts to communicate with an unencrypted HTTP backend endpoint (e.g., `http://el-herbs-backend.onrender.com/api/products`), modern browsers immediately terminate the connection and display:

```
Mixed Content: The page at 'https://el-herbs-shop.netlify.app/' was loaded over HTTPS, 
but requested an insecure resource 'http://el-herbs-backend.onrender.com/api/products'. 
This request has been blocked; the content must be served over HTTPS.
```

#### 3.2.2 Browser Security Classification
Browsers classify mixed content into two categories:
1. **Passive / Display Mixed Content**: Insecure images, video, or audio on an HTTPS page. Browsers may load these with a warning or broken padlock, because an attacker tampering with an image cannot rewrite the page logic.
2. **Active Mixed Content**: Insecure scripts, stylesheets, iframes, WebSockets, or `fetch`/`XMLHttpRequest` API calls. Browsers **strictly block** active mixed content unconditionally.
   - **Why?** An active Man-in-the-Middle (MitM) attacker on an unencrypted HTTP connection could inject malicious JavaScript into the API response, hijacking the user's session, spoofing products, or stealing sensitive credentials.

#### 3.2.3 Resolution
1. All client API calls in `api.js` use the `https://` protocol exclusively.
2. Render provisions automated, zero-configuration TLS/SSL certificates managed via Let's Encrypt for all Web Services.
3. Every API call between `https://el-herbs-shop.netlify.app` and `https://el-herbs-backend.onrender.com` is encrypted end-to-end using TLS 1.3, ensuring high security and eliminating mixed-content errors completely.
