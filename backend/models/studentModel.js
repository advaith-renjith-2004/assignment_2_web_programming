/* ==============================================================================
   EL Herbs and Spices Shop - Student Model (models/studentModel.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const db = require('../db/connection');

const Student = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM students ORDER BY id ASC');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        return rows[0] || null;
    },

    async create({ roll_no, name, email, course, marks }) {
        const numMarks = marks !== undefined ? Number(marks) : 0.00;
        const [result] = await db.query(
            'INSERT INTO students (roll_no, name, email, course, marks) VALUES (?, ?, ?, ?, ?)',
            [roll_no.trim(), name.trim(), email.trim(), course.trim(), numMarks]
        );
        return {
            id: result.insertId,
            roll_no,
            name,
            email,
            course,
            marks: numMarks
        };
    },

    async update(id, { roll_no, name, email, course, marks }) {
        const numMarks = marks !== undefined ? Number(marks) : 0.00;
        const [result] = await db.query(
            'UPDATE students SET roll_no = ?, name = ?, email = ?, course = ?, marks = ? WHERE id = ?',
            [roll_no.trim(), name.trim(), email.trim(), course.trim(), numMarks, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, roll_no, name, email, course, marks: numMarks };
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Student;
