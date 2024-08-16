import express from 'express';
import { addStudentToClassroom, addTasksToClassroom, deleteClassroom, editClassroom, getSubmissionStatusStudents, removeStudentFromClassroom } from '../controller/classroomController.js';
import { isTeacherVerified } from '../middleware/verifyUser.js';

const classroomRouter = express.Router();

// Add Studnet to Classroom
classroomRouter.get('/:classroomId/students', isTeacherVerified,addStudentToClassroom );

// Remove Studnet from Classroom
classroomRouter.delete('/:classroomId/students/:studentId', isTeacherVerified,removeStudentFromClassroom );

// Assign task to classroom
classroomRouter.post('/:classroomId/tasks', isTeacherVerified,addTasksToClassroom );

// Edit Classroom
classroomRouter.put('/:classroomId', isTeacherVerified,editClassroom );

// Delete Classroom
classroomRouter.delete('/:classroomId', isTeacherVerified,deleteClassroom );

// Task sumbimmison status
classroomRouter.get('/:classroomId/tasks/:taskId/submissions', isTeacherVerified,getSubmissionStatusStudents );





export default classroomRouter;
