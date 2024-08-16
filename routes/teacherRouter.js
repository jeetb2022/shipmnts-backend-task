import express from 'express';
import { createClassroom, getTeacherClassrooms, getTeacherInfo } from '../controller/teacherController.js';

const teacherRouter = express.Router();


// Create Classroom
teacherRouter.post('/:teacherId/classrooms', createClassroom);

// View Classrooms
teacherRouter.get('/:teacherId/classrooms', getTeacherClassrooms);



export default teacherRouter;
