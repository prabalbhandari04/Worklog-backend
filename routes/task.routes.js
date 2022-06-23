import express from 'express';
const router = express.Router();
import Task from '../models/taskModel.js';

import {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';
import { protect, admin } from '../middlewares/authMiddleWare.js';
import allqueryresults from '../middlewares/allqueryresults.js';

router
    .route('/')
    .post(protect, createTask)
    .get(
        allqueryresults(Task, [
            {
                path: 'userId',
                select: 'firstName lastName',
            },
            {
                path: 'projectId',
                select: 'title',
            },
            {
                path: 'categoryId',
                select: 'title',
            },
        ]),
        getAllTasks
    );
router
    .route('/:id')
    .get(getSingleTask)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

export default router;
