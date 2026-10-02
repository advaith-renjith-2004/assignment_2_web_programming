/* ==============================================================================
   EL Herbs and Spices Shop - Student Controller (controllers/studentController.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const Student = require('../models/studentModel');

const studentController = {
    // 1. GET /api/students
    async getAllStudents(req, res, next) {
        try {
            const students = await Student.getAll();
            return res.status(200).json({
                success: true,
                count: students.length,
                data: students
            });
        } catch (err) {
            next(err);
        }
    },

    // 2. GET /api/students/:id
    async getStudentById(req, res, next) {
        try {
            const studentId = parseInt(req.params.id, 10);
            if (isNaN(studentId)) {
                return res.status(400).json({ success: false, error: "Invalid student ID. Must be a numeric integer." });
            }

            const student = await Student.getById(studentId);
            if (!student) {
                return res.status(404).json({ success: false, error: `Student with ID #${studentId} not found.` });
            }

            return res.status(200).json({ success: true, data: student });
        } catch (err) {
            next(err);
        }
    },

    // 3. POST /api/students
    async createStudent(req, res, next) {
        try {
            const { roll_no, name, email, course, marks } = req.body;
            if (!roll_no || !name || !email || !course) {
                return res.status(400).json({
                    success: false,
                    error: "All student fields are required: roll_no, name, email, course."
                });
            }

            const newStudent = await Student.create({ roll_no, name, email, course, marks });
            return res.status(201).json({
                success: true,
                message: "Student created successfully in database",
                data: newStudent
            });
        } catch (err) {
            next(err);
        }
    },

    // 4. PUT /api/students/:id
    async updateStudent(req, res, next) {
        try {
            const studentId = parseInt(req.params.id, 10);
            if (isNaN(studentId)) {
                return res.status(400).json({ success: false, error: "Invalid student ID. Must be a numeric integer." });
            }

            const { roll_no, name, email, course, marks } = req.body;
            if (!roll_no || !name || !email || !course) {
                return res.status(400).json({
                    success: false,
                    error: "All student fields are required: roll_no, name, email, course."
                });
            }

            const updated = await Student.update(studentId, { roll_no, name, email, course, marks });
            if (!updated) {
                return res.status(404).json({ success: false, error: `Student with ID #${studentId} not found.` });
            }

            return res.status(200).json({
                success: true,
                message: `Student #${studentId} updated successfully in database`,
                data: updated
            });
        } catch (err) {
            next(err);
        }
    },

    // 5. DELETE /api/students/:id
    async deleteStudent(req, res, next) {
        try {
            const studentId = parseInt(req.params.id, 10);
            if (isNaN(studentId)) {
                return res.status(400).json({ success: false, error: "Invalid student ID. Must be a numeric integer." });
            }

            const deleted = await Student.delete(studentId);
            if (!deleted) {
                return res.status(404).json({ success: false, error: `Student with ID #${studentId} not found.` });
            }

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
};

module.exports = studentController;
