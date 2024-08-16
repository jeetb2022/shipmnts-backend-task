
export const getStudentInfo = async (req, res) => {
  const id = req.params.studentId;
  try {
    res.json(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getStudentClassroom = async (req, res) => {
  const id = req.params.studentId;
  try {
    res.json(id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getClassroomTasks = async (req, res) => {
  const studnetId = req.params.studentId;
  const classroomId = req.params.classroomId;
  try {
    res.json({classroomId,studnetId});
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
