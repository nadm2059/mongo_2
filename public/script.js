const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function fetchTasks() {
  const res = await fetch('/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteTask(task._id);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
}

taskForm.onsubmit = async e => {
  e.preventDefault();
  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: taskInput.value }),
  });
  taskInput.value = '';
  fetchTasks();
};

fetchTasks();
