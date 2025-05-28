// Get the form element with id 'taskForm' from the HTML document
const taskForm = document.getElementById('taskForm');
// Get the input element with id 'taskInput' from the HTML document
const taskInput = document.getElementById('taskInput');
// Get the element with id 'taskList' where tasks will be displayed
const taskList = document.getElementById('taskList');

// Define an asynchronous function to fetch tasks from the server
async function fetchTasks() {
  // Await the response from a GET request to the '/tasks' endpoint
  const res = await fetch('/tasks');
  // Await parsing the response JSON data into a JavaScript object/array
  const tasks = await res.json();
  // Clear the current task list display in the DOM
  taskList.innerHTML = '';
  // Loop through each task object in the tasks array
  tasks.forEach(task => {
    // Create a new list item element for the task
    const li = document.createElement('li');
    // Set the text content of the list item to the task's title
    li.textContent = task.title;
    // Create a new button element for deleting the task
    const btn = document.createElement('button');
    // Set the button's text content to 'Delete'
    btn.textContent = 'Delete';
    // Assign an onclick event to the button to call deleteTask with the task's id when clicked
    btn.onclick = () => deleteTask(task._id);
    // Append the delete button to the list item
    li.appendChild(btn);
    // Append the list item to the task list in the DOM
    taskList.appendChild(li);
  });
}

// Define an asynchronous function to delete a task by id
async function deleteTask(id) {
  // Send a DELETE request to the server to delete the task with the given id
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  // Refresh the task list after deletion to show updated tasks
  fetchTasks();
}

// Assign an asynchronous event handler for when the task form is submitted
taskForm.onsubmit = async e => {
  // Prevent the default form submission behavior (page reload)
  e.preventDefault();
  // Send a POST request to create a new task with the title from the input field
  await fetch('/tasks', {
    method: 'POST',
    // Set the request content type to JSON
    headers: { 'Content-Type': 'application/json' },
    // Send the task title in the request body as a JSON string
    body: JSON.stringify({ title: taskInput.value }),
  });
  // Clear the input field after submission
  taskInput.value = '';
  // Refresh the task list to include the new task
  fetchTasks();
};

// Initially fetch and display the tasks when the page loads
fetchTasks();
