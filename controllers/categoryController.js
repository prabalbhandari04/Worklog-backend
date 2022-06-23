import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc    create category
// @route   POST /api/v1/categories
// @access  admin
const createCategory = asyncHandler(async (req, res) => {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ status: 'success', data: { newCategory } });
});

// @desc    get all categories
// @route   GET /api/v1/categories
// @access  public
const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
});
// @desc    get single category
// @route   GET /api/v1/categories/:id
// @access  public
const getSingleCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category does not exist');
    }
    res.status(200).json({ status: 'success', data: { category } });
});

// @desc    update  category
// @route   PUT /api/v1/categories/:id
// @access  admin
const updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!category) {
        res.status(404);
        throw new Error('category does not exist');
    }
    res.status(200).json({ status: 'success', data: { category } });
});
// @desc    delete  category
// @route   DELETE /api/v1/categories/:id
// @access  admin
const deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('category does not exist');
    }
    res.status(200).json({
        status: 'success',
        message: 'Successfully deleted !',
    });
});

export {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
