/* ==============================================================================
   EL Herbs and Spices Shop - Express REST API & Middleware (server.js)
   Course: 23EEL43H Web Programming | Assignment # 2.c
   Week 3 - Day 4 & Day 5 Deliverables (Full REST API with Middleware Pipeline)
   ============================================================================== */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================================================
// WEEK 3 - DAY 5 TASK 1: MIDDLEWARE PIPELINE (IN STRICT CORRECT ORDER)
// ==============================================================================

// 1. Custom Logger Middleware: prints HTTP method, URL, and timestamp (must call next())
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // Essential: passes execution to the next middleware in pipeline
});

// 2. Request Body Parser Middleware
app.use(express.json());

// 3. CORS Middleware: Restricting access to authorized frontend origins (Day 3 Task 1 & 2)
// Origins loaded dynamically from process.env.ALLOWED_ORIGIN
const rawAllowedOrigins = process.env.ALLOWED_ORIGIN || 'http://localhost:3000,http://127.0.0.1:5500,http://localhost:5500,https://advaith-renjith-2004.github.io';
const allowedOrigins = rawAllowedOrigins.split(',').map(origin => origin.trim());

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman) or approved origins
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Access blocked by CORS policy: Origin ${origin} not allowed.`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// ==============================================================================
// IN-MEMORY DATA STORES
// ==============================================================================

let products = [
    { id: 1, name: "Cardamom (Elaichi)", price: 450, stock: 25, category: "Whole Spices" },
    { id: 2, name: "Turmeric Powder (Haldi)", price: 180, stock: 50, category: "Ground Spices" },
    { id: 3, name: "Black Pepper (Kali Mirch)", price: 320, stock: 40, category: "Whole Spices" },
    { id: 4, name: "Cinnamon Sticks (Dalchini)", price: 280, stock: 15, category: "Whole Spices" },
    { id: 5, name: "Clove (Laung)", price: 550, stock: 8, category: "Whole Spices" },
    { id: 6, name: "Ginger Powder (Saunth)", price: 150, stock: 30, category: "Ground Spices" },
    { id: 7, name: "Bay Leaf (Tej Patta)", price: 90, stock: 0, category: "Herbs" },
    { id: 8, name: "Nutmeg (Jaiphal)", price: 420, stock: 12, category: "Whole Spices" }
];

// Tasks Array for Admin Task Management (Day 5 Task 2)
let tasks = [
    { id: 1, text: "Restock Ceylon Cinnamon 200g pouches", completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: "Grind 25kg sun-dried Turmeric roots", completed: false, createdAt: new Date().toISOString() }
];

// Customer Enquiries Array (Week 4 - Day 1 Task 3)
let enquiries = [
    {
        id: 1,
        fullName: "Priya Nair",
        emailAddress: "priya@example.com",
        phoneNum: "9847012345",
        interestCategory: "Whole Spices",
        orderQuantity: 10,
        messageText: "Need wholesale pricing for 10kg Cardamom and Black Pepper.",
        newsletter: true,
        createdAt: new Date().toISOString()
    }
];

// ==============================================================================
// 4. API ENDPOINTS & ROUTES
// ==============================================================================

// GET /api/health - Server health monitor
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "EL Herbs & Spices Backend Service",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ==============================================================================
// WEEK 4 - DAY 2 TASK 1: COMPLETE REST API FOR PRODUCTS (ALL 5 ROUTES)
// Status codes used: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 404 (Not Found)
// ==============================================================================

// 1. GET /api/products - Read all products (Status 200)
app.get('/api/products', (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// 2. GET /api/products/:id - Read single product by ID (Status 200 / 400 / 404)
// Corrected route addressing Task 3 bug: parses req.params.id to number and handles 404
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);

    // Validation: id must be a valid integer
    if (isNaN(productId)) {
        return res.status(400).json({
            success: false,
            error: "Invalid product ID. Must be a numeric integer."
        });
    }

    const product = products.find(p => p.id === productId);

    // If product is not found, must send 404 Not Found (fixes Task 3 bug)
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

// ==============================================================================
// WEEK 4 - DAY 3 TASK 2: PRODUCT VALIDATION MIDDLEWARE
// Verifies:
// 1. name is not empty (string, trimmed length > 0)
// 2. price is greater than 0
// 3. stock is not negative (>= 0)
// Returns HTTP 400 Bad Request with a descriptive message if any check fails.
// ==============================================================================
const validateProduct = (req, res, next) => {
    const { name, price, stock, category } = req.body;

    // Check 1: Name must not be empty
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Product name is required and cannot be empty or whitespace."
        });
    }

    // Check 2: Price must be a valid number greater than 0
    const numPrice = Number(price);
    if (price === undefined || isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Product price must be a valid numeric value strictly greater than 0."
        });
    }

    // Check 3: Stock must be a non-negative number (>= 0)
    const numStock = Number(stock);
    if (stock === undefined || isNaN(numStock) || numStock < 0) {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Stock quantity must be a non-negative numeric value (0 or greater)."
        });
    }

    // Attach validated and trimmed values
    req.body.name = name.trim();
    req.body.price = numPrice;
    req.body.stock = numStock;
    req.body.category = (category && typeof category === 'string' && category.trim() !== '')
        ? category.trim()
        : 'Whole Spices';

    next(); // Pass to route handler
};

// 3. POST /api/products - Create new product with validateProduct middleware (Status 201 Created)
app.post('/api/products', validateProduct, (req, res) => {
    const { name, price, stock, category } = req.body;

    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
        stock,
        category
    };

    products.push(newProduct);
    console.log(`[POST /api/products] Created product #${newProduct.id}: "${newProduct.name}" (Price: ₹${newProduct.price}, Stock: ${newProduct.stock}kg)`);

    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
});

// 4. PUT /api/products/:id - Update existing product with validateProduct middleware (Status 200 OK)
app.put('/api/products/:id', validateProduct, (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({
            success: false,
            error: "Invalid product ID. Must be a numeric integer."
        });
    }

    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            error: `Product with ID #${productId} not found.`
        });
    }

    const { name, price, stock, category } = req.body;

    const updatedProduct = {
        id: productId,
        name,
        price,
        stock,
        category
    };

    products[productIndex] = updatedProduct;
    console.log(`[PUT /api/products/:id] Updated product #${productId}: "${updatedProduct.name}" (Price: ₹${updatedProduct.price}, Stock: ${updatedProduct.stock}kg)`);

    return res.status(200).json({
        success: true,
        message: `Product #${productId} updated successfully`,
        data: updatedProduct
    });
});

// 5. DELETE /api/products/:id - Delete product by ID (Status 204 No Content / 400 Bad Request / 404 Not Found)
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({
            success: false,
            error: "Invalid product ID. Must be a numeric integer."
        });
    }

    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            error: `Product with ID #${productId} not found.`
        });
    }

    const removedProduct = products.splice(productIndex, 1)[0];
    console.log(`[DELETE /api/products/:id] Removed product #${productId}: "${removedProduct.name}"`);

    // Status 204: No Content indicates success with no response body
    return res.status(204).send();
});

/* ==============================================================================
   WEEK 4 - DAY 2 TASK 3: BUGGY ROUTE ANALYSIS & CORRECTIONS
   ==============================================================================
   
   THE GIVEN BUGGY ROUTE:
   ------------------------------------------------------------------------------
   app.get('/api/products/:id', (req, res) => {
       const product = products.find(p => p.id === req.params.id); // BUG 1: Type mismatch with strict equality ===
       res.json(product);                                          // BUG 2: Sends 200 with empty body if not found
   });
   ------------------------------------------------------------------------------

   EXPLANATION OF THE TWO CRITICAL BUGS:
   1. Strict Equality Type Mismatch (p.id === req.params.id):
      - Express URL route parameters (`req.params.id`) are ALWAYS strings (e.g. "1").
      - The `products` database uses numeric IDs (e.g. 1).
      - In JavaScript, `1 === "1"` evaluates to `false` because strict equality compares
        both type and value without coercion. Consequently, `find()` NEVER finds any product.
      - Fix: Parse `req.params.id` using `parseInt(req.params.id, 10)` before comparing.
   
   2. Missing 404 Not Found Status:
      - When `product` is undefined, `res.json(undefined)` sends an empty response with
        HTTP 200 OK! A 200 OK falsely informs client apps and frontends that the resource exists.
      - Fix: Check `if (!product)` and explicitly return `res.status(404).json(...)`.
   ------------------------------------------------------------------------------
*/

// ------------------------------------------------------------------------------
// WEEK 3 - DAY 5 TASK 2: /api/tasks ROUTES
// ------------------------------------------------------------------------------

// 1. GET /api/tasks: Returns full task list with status 200
app.get('/api/tasks', (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
});

// 2. POST /api/tasks: Validates input, returns 400 for empty text or 201 for valid task
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;

    // Input Validation: check if text is empty or non-existent
    if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Task text cannot be empty or blank."
        });
    }

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    console.log(`[POST /api/tasks] Created task #${newTask.id}: "${newTask.text}"`);

    return res.status(201).json({
        success: true,
        message: "Task added successfully",
        data: newTask
    });
});

// 3. DELETE /api/tasks/:id: Returns 404 for wrong id, or 204 No Content after deleting
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            error: `Task with id #${taskId} was not found.`
        });
    }

    const deleted = tasks.splice(taskIndex, 1)[0];
    console.log(`[DELETE /api/tasks/:id] Removed task #${taskId}: "${deleted.text}"`);

    // Status 204: No Content indicates successful deletion
    return res.status(204).send();
});

// ------------------------------------------------------------------------------
// WEEK 4 - DAY 1 TASK 3: /api/enquiries ROUTES
// ------------------------------------------------------------------------------

// 1. GET /api/enquiries: List all submitted customer enquiries (200 OK)
app.get('/api/enquiries', (req, res) => {
    res.status(200).json({
        success: true,
        count: enquiries.length,
        data: enquiries
    });
});

// 2. POST /api/enquiries: Receive new customer enquiry from frontend form (201 Created)
app.post('/api/enquiries', (req, res) => {
    const { fullName, emailAddress, phoneNum, messageText } = req.body;

    // Validate required fields
    if (!fullName || !emailAddress || !messageText) {
        return res.status(400).json({
            success: false,
            error: "Full name, email address, and message text are required fields."
        });
    }

    const newEnquiry = {
        id: enquiries.length > 0 ? Math.max(...enquiries.map(e => e.id)) + 1 : 1,
        ...req.body,
        status: "received",
        createdAt: new Date().toISOString()
    };

    enquiries.push(newEnquiry);
    console.log(`[POST /api/enquiries] Received enquiry #${newEnquiry.id} from ${newEnquiry.fullName} (${newEnquiry.emailAddress})`);

    return res.status(201).json({
        success: true,
        message: `Thank you, ${newEnquiry.fullName}! Your enquiry has been received by EL Herbs & Spices. Our customer care team will contact you at ${newEnquiry.emailAddress} shortly.`,
        data: newEnquiry
    });
});

// ==============================================================================
// 5. 404 NOT FOUND MIDDLEWARE (Day 5 Task 1)
// ==============================================================================
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
        requestedUrl: req.originalUrl
    });
});

// ==============================================================================
// 6. CENTRAL ERROR HANDLER MIDDLEWARE (Must take 4 parameters: err, req, res, next)
// ==============================================================================
app.use((err, req, res, next) => {
    console.error("[Internal Server Error Caught]:", err.stack || err.message);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || "Internal Server Error",
        statusCode: statusCode
    });
});

// ==============================================================================
// WEEK 3 - DAY 5 TASK 3: BUGGY SERVER PROGRAM ANALYSIS & CORRECTIONS
// ==============================================================================
/*
---------------------------------------------------------------------------------
SERVER PROGRAM ERRORS AND DOCUMENTED FIXES (Task 3):
---------------------------------------------------------------------------------
1. Bug 1: Logger does not call next()
   - Problem: Without calling next(), the request hangs indefinitely and never 
     reaches subsequent route handlers.
   - Fix: Added next(); at the end of logger middleware function.

2. Bug 2: CORS allows every website without restriction
   - Problem: Using app.use(cors()) or wildcard '*' permits any malicious 
     external website to make authenticated requests from user browsers.
   - Fix: Configured CORS with allowedOrigins whitelist array.

3. Bug 3: No input validation performed on task creation
   - Problem: Accepting req.body without validation allows blank, undefined, or 
     malformed objects to corrupt the backend database.
   - Fix: Added explicit check `if (!text || text.trim() === '') return res.status(400)`.

4. Bug 4: Error handler written with three parameters instead of four
   - Problem: Express detects error-handling middleware specifically by checking
     the arity (function.length === 4). Writing (req, res, next) causes Express 
     to treat it as a standard middleware, failing to catch errors passed to next(err).
   - Fix: Explicitly defined error handler signature with four parameters:
     `(err, req, res, next)`.
---------------------------------------------------------------------------------
*/

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🌿 EL Herbs & Spices REST API Server running on port ${PORT}`);
    });
}

module.exports = app;
