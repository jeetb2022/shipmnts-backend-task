import express from 'express';
import { createClassroom, getTeacherClassrooms, getTeacherInfo } from '../controller/teacherController.js';
import { isTeacherVerified } from '../middleware/verifyUser.js';

const teacherRouter = express.Router();


// Create Classroom
teacherRouter.post('/:teacherId/classrooms', isTeacherVerified, createClassroom);

// View Classrooms
teacherRouter.get('/:teacherId/classrooms', isTeacherVerified,getTeacherClassrooms);



export default teacherRouter;
