# Week 4 - Day 2: REST API Testing & Route Bug Analysis

**Course:** 23EEL43H Web Programming  
**Topic:** Complete REST API for Products Resource (5 Routes)  

---

## 1. Product Resource REST Endpoints Specification

| HTTP Method | Route | Description | Success Status | Failure Status |
|-------------|-------|-------------|----------------|----------------|
| **GET** | `/api/products` | Retrieve complete spice catalog | **200 OK** | 500 Server Error |
| **GET** | `/api/products/:id` | Retrieve single spice by numeric ID | **200 OK** | **400 Bad Request** / **404 Not Found** |
| **POST** | `/api/products` | Create a new spice item in catalog | **201 Created** | **400 Bad Request** |
| **PUT** | `/api/products/:id` | Update entire product details by ID | **200 OK** | **400 Bad Request** / **404 Not Found** |
| **DELETE** | `/api/products/:id` | Remove spice item from inventory by ID | **204 No Content** | **400 Bad Request** / **404 Not Found** |

---

## 2. cURL Test Executions and Recorded Status Codes

### Test 1: GET All Products (Success)
```bash
curl -i http://localhost:5000/api/products
```
- **Recorded HTTP Status:** `200 OK`
- **Response Payload:** Array of 8 product objects with `count: 8` and `success: true`.

### Test 2: GET Product By ID (Success)
```bash
curl -i http://localhost:5000/api/products/1
```
- **Recorded HTTP Status:** `200 OK`
- **Response Payload:** `{"success": true, "data": {"id": 1, "name": "Cardamom (Elaichi)", "price": 450, "stock": 25, "category": "Whole Spices"}}`

### Test 3: GET Product By ID (Failure: Not Found)
```bash
curl -i http://localhost:5000/api/products/999
```
- **Recorded HTTP Status:** `404 Not Found`
- **Response Payload:** `{"success": false, "error": "Product with ID #999 not found."}`

### Test 4: GET Product By ID (Failure: Non-Numeric ID)
```bash
curl -i http://localhost:5000/api/products/abc
```
- **Recorded HTTP Status:** `400 Bad Request`
- **Response Payload:** `{"success": false, "error": "Invalid product ID. Must be a numeric integer."}`

### Test 5: POST Create Product (Success)
```bash
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Star Anise (Chakra Phool)", "price": 380, "stock": 15, "category": "Whole Spices"}'
```
- **Recorded HTTP Status:** `201 Created`
- **Response Payload:** `{"success": true, "message": "Product created successfully", "data": {"id": 9, "name": "Star Anise (Chakra Phool)", ...}}`

### Test 6: POST Create Product (Failure: Invalid Data)
```bash
curl -i -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "", "price": -20, "stock": -5}'
```
- **Recorded HTTP Status:** `400 Bad Request`
- **Response Payload:** `{"success": false, "error": "Validation failed: 'name' and 'category' are required strings, 'price' must be > 0, and 'stock' must be >= 0."}`

### Test 7: PUT Update Product (Success)
```bash
curl -i -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Cardamom (Elaichi) Grade A", "price": 480, "stock": 28, "category": "Whole Spices"}'
```
- **Recorded HTTP Status:** `200 OK`
- **Response Payload:** `{"success": true, "message": "Product #1 updated successfully", "data": {...}}`

### Test 8: PUT Update Product (Failure: Non-Existent ID)
```bash
curl -i -X PUT http://localhost:5000/api/products/999 \
  -H "Content-Type: application/json" \
  -d '{"name": "Ghost Pepper", "price": 300, "stock": 5, "category": "Herbs"}'
```
- **Recorded HTTP Status:** `404 Not Found`
- **Response Payload:** `{"success": false, "error": "Product with ID #999 not found."}`

### Test 9: DELETE Product (Success)
```bash
curl -i -X DELETE http://localhost:5000/api/products/8
```
- **Recorded HTTP Status:** `204 No Content`
- **Response Headers:** `HTTP/1.1 204 No Content` (Empty body as per HTTP RFC standards)

### Test 10: DELETE Product (Failure: Already Deleted / Not Found)
```bash
curl -i -X DELETE http://localhost:5000/api/products/999
```
- **Recorded HTTP Status:** `404 Not Found`
- **Response Payload:** `{"success": false, "error": "Product with ID #999 not found."}`

---

## 3. Buggy Route Analysis & Fix Documentation (Task 3)

### The Given Buggy Implementation:
```javascript
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    res.json(product);
});
```

### Identification of the Defects:
1. **Type Mismatch with Strict Equality (`===`):**
   - URL route parameters in Express (`req.params.id`) are parsed as strings (e.g. `"1"`).
   - In-memory database identifiers `p.id` are integers (e.g. `1`).
   - The strict equality operator `===` checks both value and type without coercion (`1 === "1"` is always `false`).
   - Consequently, `products.find(...)` returns `undefined` for every single request.
2. **Missing 404 Status Code for Unfound Resources:**
   - Calling `res.json(undefined)` or `res.json(null)` defaults to sending HTTP `200 OK`.
   - Returning HTTP `200 OK` falsely tells client applications and search crawlers that the requested product was found and exists.
   - According to REST principles, a missing resource must return HTTP `404 Not Found`.

### The Corrected Implementation:
```javascript
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({
            success: false,
            error: "Invalid product ID. Must be a numeric integer."
        });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: `Product with ID #${productId} not found.`
        });
    }

    return res.status(200).json({
        success: true,
        data: product
    });
});
```
