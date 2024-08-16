import express from 'express';
import { getStudentInfo } from '../controller/studentController.js';
import { getStudentClassroom } from '../controller/studentController.js';
import { getClassroomTasks } from '../controller/studentController.js';
import { submitClassroomTask } from '../controller/studentController.js';
import { getTaskStatus } from '../controller/studentController.js';

const studentRouter = express.Router();

// View Classrooms
studentRouter.get('/:studentId/classrooms', getStudentClassroom);

// View Tasks
studentRouter.get('/:studentId/classrooms/:classroomId', getClassroomTasks);

// Submit a Task
studentRouter.post('/:studentId/classrooms/:classroomId/task/:taskId', submitClassroomTask);

//Task status
studentRouter.get('/:studentId/classrooms/:classroomId/task/:taskId', getTaskStatus);

export default studentRouter;
