import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';

import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
} from '../controllers/userController.js';

import { protect, admin } from '../middlewares/authMiddleWare.js';
import allqueryresults from '../middlewares/allqueryresults.js';

router.route('/').post(registerUser).get(allqueryresults(User), getUsers);

router.route('/login').post(authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById);

export default router;
