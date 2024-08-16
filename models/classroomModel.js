import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
    classroomId: {
        type: String,
        required: true,
    },
    classroomName: {
        type: String,
        required: true,
        trim: true
    },
    teacher: {
        type: String,
        required: true
    },
    students: [{
        type: String,
    }],
    tasks: [{
        type: String,
    }]
});

const ClassroomModel = mongoose.model('classroom', classroomSchema);

export default ClassroomModel;
