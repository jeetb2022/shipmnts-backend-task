import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './mongoDB.js';
import studentRouter from './routes/studentRoutes.js';
import teacherRouter from './routes/teacherRouter.js';
import classroomRouter from './routes/classroomRouter.js';
import authRouter from './routes/authRouter.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
app.use(morgan('dev')); // Log HTTP requests

// Connect to MongoDB


connectDB().then(()=>{
  console.log('db conneted');
  
  // Define Routes 
  
  app.use('/students/',studentRouter);
  app.use('/teachers/',teacherRouter);
  app.use('/classrooms/',classroomRouter);
  app.use('/auth/',authRouter);

  console.log(process.env.JWT_SECRET);
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Something went wrong!',
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

}).catch((err)=>{
  console.log(err);
});
export default app;
