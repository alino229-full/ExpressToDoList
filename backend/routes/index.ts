import express from 'express';
// @ts-ignore
import taskRoutes from './taskRoutes';
// @ts-ignore
import userRoutes from './userRoutes';
// Autres imports de routes...

const router = express.Router();

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
// Autres utilisations de routes...


export default router;
