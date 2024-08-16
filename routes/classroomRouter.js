import express from 'express';
import { addStudentToClassroom, addTasksToClassroom, deleteClassroom, editClassroom, getSubmissionStatusStudents, removeStudentFromClassroom } from '../controller/classroomController.js';

const classroomRouter = express.Router();

// Add Studnet to Classroom
classroomRouter.get('/:classroomId/students',addStudentToClassroom );

// Remove Studnet from Classroom
classroomRouter.delete('/:classroomId/students/:studentId',removeStudentFromClassroom );


// Assign task to classroom
classroomRouter.post('/:classroomId/tasks',addTasksToClassroom );

// Edit Classroom
classroomRouter.put('/:classroomId',editClassroom );

// Delete Classroom
classroomRouter.delete('/:classroomId',deleteClassroom );

// Task sumbimmison status
classroomRouter.get('/:classroomId/tasks/:taskId/submissions',getSubmissionStatusStudents );





export default classroomRouter;
