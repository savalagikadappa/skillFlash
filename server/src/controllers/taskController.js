const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { problemTitle, problemDescription, budget, deadline } = req.body;
    if (!problemTitle || !problemDescription || !budget || !deadline) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    const task = await Task.create({ problemTitle, problemDescription, budget, deadline, user: req.user.sub });
    res.status(201).json({ success: true, message: 'Task added successfully', task });
  } catch (err) {
    console.error(err); res.status(500).json({ success: false, error: 'Failed to add task' });
  }
};

exports.listTasks = async (_req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).populate('user', 'email');
    res.status(200).json({ success: true, tasks });
  } catch (err) { console.error(err); res.status(500).json({ success: false, error: 'Error retrieving tasks' }); }
};
