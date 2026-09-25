# Week 4 - Day 3: Environment Configuration & Backend Validation Security

**Course:** 23EEL43H Web Programming  
**Topic:** Environment Variables with `dotenv`, Input Validation Middleware, and Security Architecture  

---

## 1. Environment Configuration Architecture

All sensitive configuration parameters (ports, database credentials, and CORS origins) are decoupled from the codebase using the `dotenv` package and loaded via `process.env`.

### Keys Defined in `.env` and `.env.example`:
- `PORT`: Network port for Express server (`5000`)
- `NODE_ENV`: Runtime environment (`development` / `production`)
- `ALLOWED_ORIGIN`: Whitelisted client origins for Cross-Origin Resource Sharing (CORS)
- `DB_HOST`: Host address of MySQL server (`localhost`)
- `DB_PORT`: MySQL server port (`3306`)
- `DB_USER`: Database authentication username (`root`)
- `DB_PASSWORD`: Database authentication password
- `DB_NAME`: Database schema name (`el_herbs_shop`)

### Git Security Verification:
The `.env` file contains sensitive local credentials and secrets; it is explicitly specified in `.gitignore` and confirmed untracked by Git (`git status --ignored` lists `backend/.env` under ignored files). A template `.env.example` file is tracked in Git with placeholder values so team members and grading evaluators can set up their environments safely.

---

## 2. Server-Side Validation Middleware (`validateProduct`)

Implemented as Express middleware executed on both `POST /api/products` and `PUT /api/products/:id`:

```javascript
const validateProduct = (req, res, next) => {
    const { name, price, stock } = req.body;

    // Check 1: Non-empty name
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Product name is required and cannot be empty or whitespace."
        });
    }

    // Check 2: Price strictly greater than 0
    const numPrice = Number(price);
    if (price === undefined || isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Product price must be a valid numeric value strictly greater than 0."
        });
    }

    // Check 3: Stock non-negative (>= 0)
    const numStock = Number(stock);
    if (stock === undefined || isNaN(numStock) || numStock < 0) {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Stock quantity must be a non-negative numeric value (0 or greater)."
        });
    }

    next();
};
```

---

## 3. Direct API cURL Test Results (Bypassing Browser)

### Direct cURL Request 1: Whitespace-only Product Name
```bash
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "   ", "price": 250, "stock": 10}'
```
**Server Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "success": false,
  "error": "Validation Error: Product name is required and cannot be empty or whitespace."
}
```

### Direct cURL Request 2: Negative Price (`-50`)
```bash
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mace (Javitri)", "price": -50, "stock": 10}'
```
**Server Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "success": false,
  "error": "Validation Error: Product price must be a valid numeric value strictly greater than 0."
}
```

### Direct cURL Request 3: Negative Stock Quantity (`-5`)
```bash
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mace (Javitri)", "price": 400, "stock": -5}'
```
**Server Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8

{
  "success": false,
  "error": "Validation Error: Stock quantity must be a non-negative numeric value (0 or greater)."
}
```

---

## 4. Why Browser-Only Validation Is Completely Insufficient (Task 3 Note)

In modern web development, **client-side validation is solely a user experience (UX) convenience**, not a security control. Relying solely on browser-side validation introduces severe security vulnerabilities for the following fundamental reasons:

1. **Direct HTTP Access Beyond the Browser:**
   - Any client can transmit arbitrary HTTP requests directly to backend REST endpoints using tools like `cURL`, `Postman`, `Insomnia`, or automated Python / Go scripts without ever downloading or executing the HTML/JavaScript frontend.
2. **Client-Side Code Tampering:**
   - The user has complete control over the execution environment (the web browser). Using Browser Developer Tools (F12):
     - An adversary can delete `required`, `pattern`, `min`, `max` HTML attributes from input fields in the DOM inspector.
     - An adversary can disable JavaScript completely in browser settings.
     - An adversary can overwrite JavaScript validation functions in the Console (`validateName = () => true`).
3. **Network Interception & Proxy Tampering:**
   - Attackers can route browser traffic through local intercepting proxies (such as OWASP ZAP or Burp Suite). The user enters valid data into the browser to pass frontend checks; once the request leaves the browser, the attacker intercepts the HTTP packet, injects malicious/corrupted payloads, and forwards it to the server.
4. **Data Integrity & Business Logic Enforcement:**
   - Erroneous values like negative prices, negative stock, or SQL/NoSQL injection payloads corrupt downstream database tables, break accounting transactions, and trigger unhandled runtime exceptions on the server.
5. **Architectural Rule:**
   - *"Never trust client input."* The backend server is the authoritative gatekeeper. All incoming inputs must be validated, sanitized, and type-checked on the server before reaching databases or business logic.
