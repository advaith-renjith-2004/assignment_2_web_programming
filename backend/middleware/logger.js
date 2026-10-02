/* ==============================================================================
   EL Herbs and Spices Shop - Logger Middleware (middleware/logger.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // Essential: passes execution to next middleware in pipeline
};

module.exports = logger;
