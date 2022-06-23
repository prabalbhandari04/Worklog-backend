import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        topic: {
            type: String,
            required: false,
        },
        description: {
            type: String,
        },
        duration: {
            type: Number,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
