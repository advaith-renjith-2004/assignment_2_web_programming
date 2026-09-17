/* ==============================================================================
   EL Herbs and Spices Shop - Backend Express Server (server.js)
   Course: 23EEL43H Web Programming | Assignment # 2.c
   Week 3 - Day 4 & Day 5 Deliverables
   ============================================================================== */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON request bodies (Day 4 Task 1)
app.use(express.json());

// In-Memory Products Database (Day 4 Task 1)
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

// ==============================================================================
// WEEK 3 - DAY 4 ROUTES
// ==============================================================================

// Route 1: Health Check GET /api/health (Day 4 Task 1)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "EL Herbs & Spices API Server is running smoothly.",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Route 2: Products Catalog GET /api/products (Day 4 Task 1)
app.get('/api/products', (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// Route 3: Add New Product POST /api/products (Day 4 Task 2)
app.post('/api/products', (req, res) => {
    const { name, price, stock, category } = req.body;

    if (!name || price === undefined || stock === undefined || !category) {
        return res.status(400).json({
            success: false,
            error: "Missing required product fields (name, price, stock, category)."
        });
    }

    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
        category: category.trim()
    };

    products.push(newProduct);
    console.log(`[POST /api/products] Created new product #${newProduct.id}: ${newProduct.name}`);

    // Return status 201 Created with new product JSON (Day 4 Task 2)
    return res.status(201).json({
        success: true,
        message: "Product successfully created in inventory.",
        data: newProduct
    });
});

/*
--------------------------------------------------------------------------------
WEEK 3 DAY 4 TASK 3: CORS ERROR OBSERVATION & DOCUMENTATION
--------------------------------------------------------------------------------
When the frontend page (served on http://localhost:8080 or file://) attempts to fetch
from http://localhost:5000/api/products WITHOUT CORS middleware installed:

OBSERVED BROWSER CONSOLE CORS ERROR:
"Access to fetch at 'http://localhost:5000/api/products' from origin 'http://localhost:8080' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present 
on the requested resource. If an opaque response serves your needs, set the request's 
mode to 'no-cors' to fetch the resource with CORS disabled."

REASON:
The Same-Origin Policy (SOP) enforced by modern web browsers blocks cross-origin 
requests unless the server explicitly includes 'Access-Control-Allow-Origin' in 
its HTTP response headers. This is resolved by installing the 'cors' package on Day 5.
--------------------------------------------------------------------------------
*/

// Start Server Listener
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🌿 EL Herbs & Spices API Server listening on http://localhost:${PORT}`);
        console.log(`   - Health check: http://localhost:${PORT}/api/health`);
        console.log(`   - Product catalog: http://localhost:${PORT}/api/products`);
    });
}

module.exports = app;
