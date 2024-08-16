import ClassroomModel from "../models/classroomModel.js";
import StudentModel from "../models/studentModel.js";
import TaskModel from "../models/taskSchema.js";
import {v4 as uuid} from 'uuid';

export const addStudentToClassroom = async (req, res) => {
    try {
      const classroomId = req.params.classroomId;
      const teacherId = req.teacher.teacherId;
      const studentId = req.body.studentId;
  
      if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required' });
      }
  
      const classroom = await ClassroomModel.findOne({ classroomId, teacher: teacherId });
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found or does not belong to the teacher' });
      }
  
      const student = await StudentModel.findOne({ studentId });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      if (classroom.students.includes(studentId)) {
        return res.status(400).json({ message: 'Student is already in the classroom' });
      }
  
      classroom.students.push(studentId);
      await classroom.save();
  
      student.classrooms.push(classroomId);
      await student.save();
  
      res.status(200).json({ message: 'Student added successfully' });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  export const removeStudentFromClassroom = async (req, res) => {
    try {
      const classroomId = req.params.classroomId;
      const studentId = req.params.studentId;
  
      if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required' });
      }
  
      const classroom = await ClassroomModel.findOne({ classroomId });
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
  
      const student = await StudentModel.findOne({ studentId });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      if (!classroom.students.includes(studentId)) {
        return res.status(400).json({ message: 'Student is not in this classroom' });
      }
  
      classroom.students = classroom.students.filter(id => id.toString() !== studentId.toString());
      await classroom.save();
  
      student.classrooms = student.classrooms.filter(id => id.toString() !== classroomId.toString());
      await student.save();
  
      res.status(200).json({ message: 'Student removed successfully' });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const addTasksToClassroom = async (req, res) => {
    const classroomId = req.params.classroomId;
    const { title, description, dueDate } = req.body;
    const teacherId = req.teacher.teacherId; 

    try {
      if (!title || !description || !dueDate) {
        return res.status(400).json({ message: 'Title, description, and dueDate are required' });
      }
  
      const classroom = await ClassroomModel.findOne({ classroomId, teacher: teacherId });
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found or does not belong to the teacher' });
      }
  const taskId = uuid();
      const newTask = new TaskModel({
        title,
        taskId,
        description,
        dueDate,
        classroom: classroomId 
      });
  
      await newTask.save();
  
      classroom.tasks.push(taskId);
      await classroom.save();
  
      res.status(201).json({
        taskId: taskId,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const editClassroom = async (req, res) => {
    const classroomId = req.params.classroomId;
    const { classroomName } = req.body;
    const teacherId = req.teacher.teacherId;
  
    try {

        if (!classroomName) {
        return res.status(400).json({ message: 'Classroom name is required' });
      }
  
      const classroom = await ClassroomModel.findOne({ classroomId, teacher: teacherId });
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found or does not belong to the teacher' });
      }
  
      classroom.classroomName = classroomName;
      await classroom.save();
  
      res.status(200).json({
        classroomId: classroom.classroomId,
        classroomName: classroom.classroomName
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const deleteClassroom = async (req, res) => {
    const classroomId = req.params.classroomId;
    const teacherId = req.teacher.teacherId;
  
    try {
      const classroom = await ClassroomModel.findOne({ classroomId, teacher: teacherId });
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found or does not belong to the teacher' });
      }
  
      await TaskModel.deleteMany({ classroom: classroomId });
  
      await ClassroomModel.deleteOne({ classroomId });
  
      res.status(200).json({ message: 'Classroom deleted successfully' });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const getSubmissionStatusStudents = async (req, res) => {
    const classroomId = req.params.classroomId;
    const taskId = req.params.taskId;
  
    try {
      const classroom = await ClassroomModel.findOne({ classroomId });
      if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
  
      const task = await TaskModel.findOne({ taskId, classroom: classroomId }).populate('submissions.student', 'studentId name');
      if (!task) {
        return res.status(404).json({ message: 'Task not found in this classroom' });
      }
  
      const submissionStatus = classroom.students.map(studentId => {
        const submission = task.submissions.find(sub => sub.student.toString() === studentId.toString());
        return {
          studentId,
          studentName: submission.student.name,
          status: submission ? submission.status : 'pending'
        };
      });
  
      res.status(200).json(submissionStatus);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
