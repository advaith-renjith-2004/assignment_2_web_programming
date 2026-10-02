/* ==============================================================================
   EL Herbs and Spices Shop - Validator Middleware (middleware/validator.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

/**
 * Validates product payload for POST and PUT requests:
 * 1. name is required and non-empty string
 * 2. price is a valid number > 0
 * 3. stock is a valid number >= 0
 */
const validateProduct = (req, res, next) => {
    const { name, price, stock, category } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Product name is required and cannot be empty or whitespace."
        });
    }

    const numPrice = Number(price);
    if (price === undefined || isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Product price must be a valid numeric value strictly greater than 0."
        });
    }

    const numStock = Number(stock);
    if (stock === undefined || isNaN(numStock) || numStock < 0) {
        return res.status(400).json({
            success: false,
            error: "Validation Error: Stock quantity must be a non-negative numeric value (0 or greater)."
        });
    }

    req.body.name = name.trim();
    req.body.price = numPrice;
    req.body.stock = numStock;
    req.body.category = (category && typeof category === 'string' && category.trim() !== '')
        ? category.trim()
        : 'Whole Spices';

    next();
};

module.exports = {
    validateProduct
};
