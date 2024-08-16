import express from 'express';
import { submitClassroomTask } from '../controller/studentController.js';
import { getTaskStatus } from '../controller/studentController.js';
import { isStudentVerified } from '../middleware/verifyUser.js';
import { getClassroomTasksForStudent } from '../controller/studentController.js';
import { getStudentClassrooms } from '../controller/studentController.js';

const studentRouter = express.Router();

// View Classrooms
studentRouter.get('/:studentId/classrooms',isStudentVerified , getStudentClassrooms);

// View Tasks
studentRouter.get('/:studentId/classrooms/:classroomId',isStudentVerified , getClassroomTasksForStudent);

// Submit a Task
studentRouter.post('/:studentId/classrooms/:classroomId/task/:taskId',isStudentVerified , submitClassroomTask);

//Task status
studentRouter.get('/:studentId/classrooms/:classroomId/task/:taskId',isStudentVerified , getTaskStatus);

export default studentRouter;
