import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide the peoject name'],
        },
    },
    { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
