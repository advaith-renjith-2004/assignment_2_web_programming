/* ==============================================================================
   EL Herbs and Spices Shop - Enquiry Routes (routes/enquiryRoutes.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

router.get('/', enquiryController.getAllEnquiries);
router.post('/', enquiryController.createEnquiry);

module.exports = router;
