import express from 'express';
import { studentSignIn, studentSignUp, teacherSignIn, teacherSignUp } from '../controller/authController.js';

const authRouter = express.Router();

// Sign-up student
authRouter.post('/student/sign-up',studentSignUp );

// Sign-in student
authRouter.get('/student/sign-in',studentSignIn );

// Sign-up teacher
authRouter.post('/teacher/sign-up',teacherSignUp );

// Sign-in teacher
authRouter.get('/teacher/sign-in',teacherSignIn );

export default authRouter;
