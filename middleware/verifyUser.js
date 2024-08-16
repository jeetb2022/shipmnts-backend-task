import jwt from 'jsonwebtoken';
import StudentModel from '../models/studentModel.js';
import TeacherModel from '../models/teacherModel.js';


export const isStudentVerified = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await StudentModel.findById(decoded.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    req.student = student;
    
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const isTeacherVerified = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const teacher = await TeacherModel.findById(decoded.id);
  
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      req.teacher = teacher;
      
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };