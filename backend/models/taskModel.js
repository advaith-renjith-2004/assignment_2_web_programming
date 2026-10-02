/* ==============================================================================
   EL Herbs and Spices Shop - Task Model (models/taskModel.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const db = require('../db/connection');

const Task = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM tasks ORDER BY id ASC');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
        return rows[0] || null;
    },

    async create({ text }) {
        const [result] = await db.query(
            'INSERT INTO tasks (text, completed) VALUES (?, ?)',
            [text, false]
        );
        return {
            id: result.insertId,
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Task;
