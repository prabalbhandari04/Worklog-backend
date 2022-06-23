import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// @desc    create task
// @route   POST /api/v1/tasks
// @access  admin
const createTask = asyncHandler(async (req, res) => {
    const newTask = await Task.create(req.body);
    res.status(201).json({ status: 'success', data: { newTask } });
});

// @desc    get all tasks
// @route   GET /api/v1/tasks
// @access  public
const getAllTasks = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.allqueryresults);
});

const getSingleTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id).populate([
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
    ]);

    if (!task) {
        res.status(404);
        throw new Error('Task does not exist');
    }
    res.status(200).json({ status: 'success', data: { task } });
});

// @desc    update task
// @route   PUT /api/v1/tasks/:id
// @access  admin
const updateTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        res.status(404);
        throw new Error('Task does not exist');
    }
    res.status(200).json({ status: 'success', data: { task } });
});

// @desc    delete task
// @route   DELETE /api/v1/tasks/:id
// @access  admin
const deleteTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('task does not exist');
    }
    res.status(200).json({
        status: 'success',
        message: 'Successfully deleted !',
    });
});

export { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };
