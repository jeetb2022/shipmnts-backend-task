import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
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

const StudentModel = mongoose.model('student', studentSchema);

export default StudentModel;
