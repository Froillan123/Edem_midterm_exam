const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Use CORS middleware to allow requests from different origins
app.use(cors());

app.use(express.json());  // To parse JSON request bodies

// Simulating an in-memory database with an array
let tasks = [];
let currentId = 1; // This will be used to generate unique task ids

// Function to create a new task
function createTask(name, description) {
  const task = {
    id: currentId++, // Generate unique id for the task
    name: name,
    description: description
  };
  tasks.push(task);
  return task;
}

// Function to get all tasks
function getTasks() {
  return tasks;
}

// Function to update a task
function updateTask(id, newName, newDescription) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.name = newName;
    task.description = newDescription;
    return task;
  }
  return null;
}

// Function to delete a task
function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    const removedTask = tasks.splice(index, 1);
    return removedTask[0];
  }
  return null;
}

// API Endpoints using Express.js

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(getTasks());
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Both task name and description are required!');
  }
  const task = createTask(name, description);
  res.status(201).json(task);
});

// Route to update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Both task name and description are required!');
  }
  const updatedTask = updateTask(taskId, name, description);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).send('Task not found!');
  }
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const deletedTask = deleteTask(taskId);
  if (deletedTask) {
    res.json(deletedTask);
  } else {
    res.status(404).send('Task not found!');
  }
});

// Serve the indexquestion4.html directly at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'indexquestion4.html'));  // Make sure the HTML file is in the same directory as this JS file
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});