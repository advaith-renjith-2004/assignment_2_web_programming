/* ==============================================================================
   EL Herbs and Spices Shop - Product Model (models/productModel.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const db = require('../db/connection');

const Product = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM products ORDER BY id ASC');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0] || null;
    },

    async create({ name, price, stock, category }) {
        const [result] = await db.query(
            'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)',
            [name, price, stock, category]
        );
        return {
            id: result.insertId,
            name,
            price,
            stock,
            category
        };
    },

    async update(id, { name, price, stock, category }) {
        const [result] = await db.query(
            'UPDATE products SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?',
            [name, price, stock, category, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, name, price, stock, category };
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

    // Vulnerable search: builds SQL by string concatenation
    async searchVulnerable(q) {
        const sql = "SELECT * FROM products WHERE name LIKE '%" + q + "%'";
        const [rows] = await db.query(sql);
        return { sql, rows };
    },

    // Secure search: parameterized query with ? placeholder
    async searchSecure(q) {
        const sql = "SELECT * FROM products WHERE name LIKE ?";
        const param = `%${q}%`;
        const [rows] = await db.query(sql, [param]);
        return { sql, param, rows };
    }
};

module.exports = Product;
