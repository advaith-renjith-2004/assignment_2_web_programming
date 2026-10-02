/* ==============================================================================
   EL Herbs and Spices Shop - Enquiry Controller (controllers/enquiryController.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const Enquiry = require('../models/enquiryModel');

const enquiryController = {
    // 1. GET /api/enquiries
    async getAllEnquiries(req, res, next) {
        try {
            const enquiries = await Enquiry.getAll();
            return res.status(200).json({
                success: true,
                count: enquiries.length,
                data: enquiries
            });
        } catch (err) {
            next(err);
        }
    },

    // 2. POST /api/enquiries
    async createEnquiry(req, res, next) {
        try {
            const { fullName, emailAddress, messageText } = req.body;
            if (!fullName || !emailAddress || !messageText) {
                return res.status(400).json({
                    success: false,
                    error: "Full name, email address, and message text are required fields."
                });
            }

            const newEnquiry = await Enquiry.create(req.body);
            console.log(`[POST /api/enquiries] Received enquiry #${newEnquiry.id} from ${newEnquiry.fullName} (${newEnquiry.emailAddress})`);

            return res.status(201).json({
                success: true,
                message: `Thank you, ${newEnquiry.fullName}! Your enquiry has been received by EL Herbs & Spices. Our customer care team will contact you at ${newEnquiry.emailAddress} shortly.`,
                data: newEnquiry
            });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = enquiryController;
