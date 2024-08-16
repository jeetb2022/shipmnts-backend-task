import jwt from 'jsonwebtoken';
import StudentModel from '../models/studentModel.js';
import {v4 as uuid} from 'uuid'
import TeacherModel from '../models/teacherModel.js';

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your secret key (use environment variables in production)

export const studentSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const studentId = uuid();
    const newStudent = new StudentModel({
        studentId,
      name,
      email,
      password
    });

    await newStudent.save();

    const token = jwt.sign({ id: newStudent._id, email: newStudent.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, student: newStudent });
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

export const studentSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingStudent = await StudentModel.findOne({ email });
    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isPasswordCorrect = (password === existingStudent.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: existingStudent._id, email: existingStudent.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, student: existingStudent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const teacherSignIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingTeacher = await TeacherModel.findOne({ email });
      if (!existingTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      const isPasswordCorrect = password === existingTeacher.password;
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: existingTeacher._id, email: existingTeacher.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, teacher: existingTeacher });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



  export const teacherSignUp = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingTeacher = await TeacherModel.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: 'Teacher already exists' });
      }
  
      const teacherId = uuid();
      const newTeacher = new TeacherModel({
        teacherId,
        name,
        email,
        password
      });
  
      await newTeacher.save();
  
      const token = jwt.sign({ id: newTeacher._id, email: newTeacher.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, teacher: newTeacher });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };