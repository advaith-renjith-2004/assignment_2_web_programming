/* ==============================================================================
   EL Herbs and Spices Shop - Product Routes (routes/productRoutes.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validator');

// 1. Search endpoints (must be defined BEFORE /:id route)
router.get('/search-vulnerable', productController.searchVulnerable);
router.get('/search', productController.searchSecure);

// 2. Read all products
router.get('/', productController.getAllProducts);

// 3. Read single product by ID
router.get('/:id', productController.getProductById);

// 4. Create new product
router.post('/', validateProduct, productController.createProduct);

// 5. Update existing product
router.put('/:id', validateProduct, productController.updateProduct);

// 6. Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
