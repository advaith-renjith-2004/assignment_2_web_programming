/* ==============================================================================
   EL Herbs and Spices Shop - Product Controller (controllers/productController.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const Product = require('../models/productModel');

const productController = {
    // 1. GET /api/products
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.getAll();
            return res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (err) {
            next(err);
        }
    },

    // 2. GET /api/products/:id
    async getProductById(req, res, next) {
        try {
            const productId = parseInt(req.params.id, 10);
            if (isNaN(productId)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid product ID. Must be a numeric integer."
                });
            }

            const product = await Product.getById(productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: `Product with ID #${productId} not found.`
                });
            }

            return res.status(200).json({
                success: true,
                data: product
            });
        } catch (err) {
            next(err);
        }
    },

    // 3. POST /api/products
    async createProduct(req, res, next) {
        try {
            const { name, price, stock, category } = req.body;
            const newProduct = await Product.create({ name, price, stock, category });
            return res.status(201).json({
                success: true,
                message: "Product created successfully in database",
                data: newProduct
            });
        } catch (err) {
            next(err);
        }
    },

    // 4. PUT /api/products/:id
    async updateProduct(req, res, next) {
        try {
            const productId = parseInt(req.params.id, 10);
            if (isNaN(productId)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid product ID. Must be a numeric integer."
                });
            }

            const { name, price, stock, category } = req.body;
            const updated = await Product.update(productId, { name, price, stock, category });
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    error: `Product with ID #${productId} not found.`
                });
            }

            return res.status(200).json({
                success: true,
                message: `Product #${productId} updated successfully in database`,
                data: updated
            });
        } catch (err) {
            next(err);
        }
    },

    // 5. DELETE /api/products/:id
    async deleteProduct(req, res, next) {
        try {
            const productId = parseInt(req.params.id, 10);
            if (isNaN(productId)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid product ID. Must be a numeric integer."
                });
            }

            const deleted = await Product.delete(productId);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: `Product with ID #${productId} not found.`
                });
            }

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    },

    // Search Vulnerable (String concatenation demo)
    async searchVulnerable(req, res, next) {
        try {
            const q = req.query.q || '';
            const { sql, rows } = await Product.searchVulnerable(q);
            return res.status(200).json({
                success: true,
                securityState: "VULNERABLE (Raw String Concatenation)",
                queryExecuted: sql,
                matchCount: rows.length,
                data: rows
            });
        } catch (err) {
            next(err);
        }
    },

    // Search Secure (Parameterized query)
    async searchSecure(req, res, next) {
        try {
            const q = req.query.q || '';
            const { rows } = await Product.searchSecure(q);
            return res.status(200).json({
                success: true,
                securityState: "SECURE (Parameterized Query with ? placeholder)",
                matchCount: rows.length,
                data: rows
            });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = productController;
