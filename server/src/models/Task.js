const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  problemTitle: { type: String, required: true, trim: true },
  problemDescription: { type: String, required: true, trim: true },
  budget: { type: Number, required: true, min: 0 },
  deadline: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
