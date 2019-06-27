const mongoose = require('../../config/database');

const taskSchema = new mongoose.Schema({
  name: String,
  tag: String,
  createdAt: {type: Date, default: new Date().toLocaleString()},
});

mongoose.model('Task', taskSchema);
