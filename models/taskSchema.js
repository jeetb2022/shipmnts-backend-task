import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    classroom: {
        type: String,
        required: true
    },
    submissions: [{
        student: {
            type: String,
        },
        status: {
            type: String,
            enum: ['submitted', 'pending'],
            default: 'pending'
        },

    }]
});

const TaskModel = mongoose.model('task', taskSchema);

export default TaskModel;
