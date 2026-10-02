/* ==============================================================================
   EL Herbs and Spices Shop - Express Application Server (server.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactored Server
   Contains only middleware configuration and route mounting.
   ============================================================================== */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Custom Middleware
const logger = require('./middleware/logger');
const { notFoundHandler, centralErrorHandler } = require('./middleware/errorHandler');

// Import Route Handlers
const healthRoutes = require('./routes/healthRoutes');
const productRoutes = require('./routes/productRoutes');
const taskRoutes = require('./routes/taskRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================================================
// 1. GLOBAL MIDDLEWARE PIPELINE
// ==============================================================================

// Request Logger
app.use(logger);

// Request Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration (origins loaded dynamically from process.env.ALLOWED_ORIGIN)
const rawAllowedOrigins = process.env.ALLOWED_ORIGIN || 'http://localhost:3000,http://127.0.0.1:5500,http://localhost:5500,https://advaith-renjith-2004.github.io';
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

// ==============================================================================
// 2. ROUTE MOUNTING (REST API ENDPOINTS)
// ==============================================================================

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/students', studentRoutes);

// Root greeting endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to EL Herbs & Spices Shop REST API",
        documentation: "/api/health",
        endpoints: {
            health: "/api/health",
            products: "/api/products",
            tasks: "/api/tasks",
            enquiries: "/api/enquiries",
            students: "/api/students"
        }
    });
});

// ==============================================================================
// 3. ERROR HANDLING MIDDLEWARE
// ==============================================================================

// 404 Not Found Handler
app.use(notFoundHandler);

// Central 4-Parameter Error Handler (err, req, res, next)
app.use(centralErrorHandler);

// ==============================================================================
// 4. SERVER INITIALIZATION
// ==============================================================================

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🌿 EL Herbs & Spices MVC REST API Server listening on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

module.exports = app;
