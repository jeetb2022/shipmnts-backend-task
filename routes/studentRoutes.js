import express from 'express';
import { getStudentInfo } from '../controller/studentController.js';
import { getStudentClassroom } from '../controller/studentController.js';
import { getClassroomTasks } from '../controller/studentController.js';
import { submitClassroomTask } from '../controller/studentController.js';
import { getTaskStatus } from '../controller/studentController.js';
import { isStudentVerified } from '../middleware/verifyUser.js';

const studentRouter = express.Router();

// View Classrooms
studentRouter.get('/:studentId/classrooms',isStudentVerified , getStudentClassroom);

// View Tasks
studentRouter.get('/:studentId/classrooms/:classroomId',isStudentVerified , getClassroomTasks);

// Submit a Task
studentRouter.post('/:studentId/classrooms/:classroomId/task/:taskId',isStudentVerified , submitClassroomTask);

//Task status
studentRouter.get('/:studentId/classrooms/:classroomId/task/:taskId',isStudentVerified , getTaskStatus);

export default studentRouter;
