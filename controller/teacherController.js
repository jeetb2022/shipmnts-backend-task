
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
      res.json('teacher classrooms');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  