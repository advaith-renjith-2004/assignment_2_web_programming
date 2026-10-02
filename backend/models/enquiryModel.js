/* ==============================================================================
   EL Herbs and Spices Shop - Enquiry Model (models/enquiryModel.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const db = require('../db/connection');

const Enquiry = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM enquiries ORDER BY id ASC');
        return rows;
    },

    async create(data) {
        const { fullName, emailAddress, phoneNum, interestCategory, orderQuantity, messageText, newsletter } = data;
        const [result] = await db.query(
            'INSERT INTO enquiries (full_name, email_address, phone_num, interest_category, order_quantity, message_text, newsletter) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                fullName || '',
                emailAddress || '',
                phoneNum || '',
                interestCategory || 'Whole Spices',
                orderQuantity ? Number(orderQuantity) : 1,
                messageText || '',
                newsletter ? true : false
            ]
        );
        return {
            id: result.insertId,
            ...data,
            status: 'received',
            createdAt: new Date().toISOString()
        };
    }
};

module.exports = Enquiry;
