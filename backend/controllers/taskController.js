/* ==============================================================================
   EL Herbs and Spices Shop - Task Controller (controllers/taskController.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const Task = require('../models/taskModel');

const taskController = {
    // 1. GET /api/tasks
    async getAllTasks(req, res, next) {
        try {
            const tasks = await Task.getAll();
            return res.status(200).json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        } catch (err) {
            next(err);
        }
    },

    // 2. POST /api/tasks
    async createTask(req, res, next) {
        try {
            const { text } = req.body;
            if (!text || typeof text !== 'string' || text.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: "Task text cannot be empty or blank."
                });
            }

            const newTask = await Task.create({ text: text.trim() });
            return res.status(201).json({
                success: true,
                message: "Task added successfully",
                data: newTask
            });
        } catch (err) {
            next(err);
        }
    },

    // 3. DELETE /api/tasks/:id
    async deleteTask(req, res, next) {
        try {
            const taskId = parseInt(req.params.id, 10);
            if (isNaN(taskId)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid task ID. Must be a numeric integer."
                });
            }

            const deleted = await Task.delete(taskId);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: `Task with id #${taskId} was not found.`
                });
            }

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
};

module.exports = taskController;
