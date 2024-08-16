import ClassroomModel from "../models/classroomModel.js";
import TaskModel from "../models/taskSchema.js";

export const getStudentInfo = async (req, res) => {
  const id = req.params.studentId;
  try {
    res.json(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getStudentClassrooms = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await StudentModel.findOne({studentId});

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const classrooms = await ClassroomModel.find({
      students: { $elemMatch: { $eq: studentId } }
    });


    const response = classrooms.map(classroom => ({
      classroomId: classroom.classroomId,
      classroomName: classroom.classroomName
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getClassroomTasksForStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const classroomId = req.params.classroomId;

  try {
    const student = await StudentModel.findOne({studentId});

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const classroom = await ClassroomModel.findOne({
      classroomId,
      students: { $elemMatch: { $eq: studentId } }
    });

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found or student not enrolled' });
    }

    const tasks = await TaskModel.find({ classroom: classroomId });

    const response = tasks.map(task => ({
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const submitClassroomTask = async (req, res) => {
  const studnetId = req.params.studentId;
  const classroomId = req.params.classroomId;
  const taskId = req.params.classroomId;
  try {
    res.json({classroomId,studnetId,taskId});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getTaskStatus = async (req, res) => {
  const studnetId = req.params.studentId;
  const classroomId = req.params.classroomId;
  const taskId = req.params.classroomId;
  try {
    res.json({classroomId,studnetId,taskId});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
