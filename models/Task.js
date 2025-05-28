// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Create a new schema for the Task collection in MongoDB
const TaskSchema = new mongoose.Schema({
  // Define a 'title' field of type String which is required (cannot be empty)
  title: { type: String, required: true },
  // Define a 'createdAt' field of type Date with a default value of the current date/time
  createdAt: { type: Date, default: Date.now }
});

// Export a Mongoose model named 'Task' using the TaskSchema so it can be used elsewhere
module.exports = mongoose.model('Task', TaskSchema);
