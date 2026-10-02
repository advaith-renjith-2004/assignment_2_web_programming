/* ==============================================================================
   EL Herbs and Spices Shop - Health Controller (controllers/healthController.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const healthController = {
    getHealth(req, res) {
        return res.status(200).json({
            status: "OK",
            service: "EL Herbs & Spices Backend Service",
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = healthController;
