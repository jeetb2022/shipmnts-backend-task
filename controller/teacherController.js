import {v4 as uuid} from 'uuid';
import ClassroomModel from '../models/classroomModel.js';
import TeacherModel from '../models/teacherModel.js';
export const getTeacherInfo = async (req, res) => {
    try {
      res.json('teacher');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
export const getTeacherClassrooms = async (req, res) => {
    try {
      res.json('teacher classrooms');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const createClassroom = async (req, res) => {
    try {
      const { classroomName } = req.body; 
      const { teacherId } = req.teacher; 
  
      if (!classroomName) {
        return res.status(400).json({ message: 'Classroom name is required' });
      }

      const existingClassroom = await ClassroomModel.findOne({ classroomName, teacher: teacherId });
      if (existingClassroom) {
        return res.status(400).json({ message: 'Classroom name already exists for this teacher' });
      }
  
      const classroomId = uuid();
      const newClassroom = new ClassroomModel({
        classroomId,
        classroomName,
        teacher:teacherId
      });
  
      await newClassroom.save();
  
      await TeacherModel.findOneAndUpdate(
        {teacherId},
        { $push: { classrooms: newClassroom.classroomId } },
        { new: true }
      );
  
      res.status(201).json({ classroomId: newClassroom.classroomId, classroomName: newClassroom.classroomName });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };