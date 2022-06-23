import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

// @desc    create project
// @route   POST /api/v1/projects
// @access  admin
const createProject = asyncHandler(async (req, res) => {
    const newProject = await Project.create(req.body);
    res.status(201).json({ status: 'success', data: { newProject } });
});

// @desc    get all projects
// @route   GET /api/v1/projects
// @access  public
const getAllProjects = asyncHandler(async (req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({ data: projects });
});
// @desc    get all projects
// @route   GET /api/v1/projects/:id
// @access  public
const getSingleProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project does not exist');
    }
    res.status(200).json({ status: 'success', data: { project } });
});

// @desc    update project
// @route   PUT /api/v1/projects/:id
// @access  admin
const updateProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!project) {
        res.status(404);
        throw new Error('Project does not exist');
    }
    res.status(200).json({ status: 'success', data: { project } });
});

// @desc    delete project
// @route   DELETE /api/v1/projects/:id
// @access  admin
const deleteProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Project does not exist');
    }
    res.status(200).json({
        status: 'success',
        message: 'Successfully deleted !',
    });
});

export {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
