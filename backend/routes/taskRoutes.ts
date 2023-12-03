import express from 'express';
import { validate } from '../middleware/validate'; // Middleware de validation
import { taskValidationRules } from '../validators/taskValidation';
import {getAllTasks, createTask, updateTask, deleteTask, updateTaskStatus} from '../controllers/taskController';
import {taskUpdateValidationRules} from "../validators/taskUpdateValidation";

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', taskValidationRules(), validate, createTask);
router.put('/:taskId', taskUpdateValidationRules(), validate, updateTask);
router.delete('/:taskId', deleteTask);
router.put('/status/:taskId', updateTaskStatus);
export default router;
