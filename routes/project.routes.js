import express from 'express';
const router = express.Router();
import Project from '../models/projectModel.js';

import {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController.js';
import { protect, admin } from '../middlewares/authMiddleWare.js';
import allqueryresults from '../middlewares/allqueryresults.js';

router
    .route('/')
    .post(protect, admin, createProject)
    .get(allqueryresults(Project), getAllProjects);
router
    .route('/:id')
    .get(getSingleProject)
    .put(protect, admin, updateProject)
    .delete(protect, admin, deleteProject);

export default router;
