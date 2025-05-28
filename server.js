const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the tasks route
const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));  // Serves frontend files from /public

// API Route
app.use('/tasks', tasksRouter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
