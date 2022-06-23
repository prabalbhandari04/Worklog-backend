import express from 'express';
const router = express.Router();
import Category from '../models/categoryModel.js';

import {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middlewares/authMiddleWare.js';
import allqueryresults from '../middlewares/allqueryresults.js';

router
    .route('/')
    .post(protect, admin, createCategory)
    .get(allqueryresults(Category), getAllCategories);
router
    .route('/:id')
    .get(getSingleCategory)
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory);

export default router;
