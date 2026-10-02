/* ==============================================================================
   EL Herbs and Spices Shop - Error Handlers (middleware/errorHandler.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

// 404 Route Not Found Middleware
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
        requestedUrl: req.originalUrl
    });
};

// Central 4-Parameter Error Handling Middleware (err, req, res, next)
const centralErrorHandler = (err, req, res, next) => {
    console.error("[Internal Server Error Caught]:", err.stack || err.message);
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || "Internal Server Error",
        statusCode: statusCode
    });
};

module.exports = {
    notFoundHandler,
    centralErrorHandler
};
