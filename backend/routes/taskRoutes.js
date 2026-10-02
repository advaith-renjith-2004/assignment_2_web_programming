/* ==============================================================================
   EL Herbs and Spices Shop - Task Routes (routes/taskRoutes.js)
   Course: 23EEL43H Web Programming | Assignment # 2.e
   Week 5 - Day 1 Task 1: MVC Architecture Refactoring
   ============================================================================== */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
