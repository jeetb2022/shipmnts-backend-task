import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    classrooms: [{
        type: String,
    }]
});

const TeacherModel = mongoose.model('teacher', teacherSchema);

export default TeacherModel;
