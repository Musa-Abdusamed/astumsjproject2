// ============================================================
// To-Do List App js
// ============================================================
let tasks = [];

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const errorMsg = document.getElementById('errorMsg');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const remainingCount = document.getElementById('remainingCount');
const counter = document.getElementById('counter');
const allDoneMsg = document.getElementById('allDoneMsg');
const colorCircles = document.querySelectorAll('.color-circle');

function render() {
  taskList.textContent = '';

  
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.done) {
      li.classList.add('done');
    }

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const doneBtn = document.createElement('button');
    doneBtn.className = 'done-btn';
    doneBtn.textContent = task.done ? 'Undo' : 'Done';
    doneBtn.addEventListener('click', () => toggleDone(i));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(i));

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  updateCounter();
}

function updateCounter() {
  const undoneTasks = tasks.filter(t => !t.done);
  const doneCount = tasks.length - undoneTasks.length;

  remainingCount.textContent = undoneTasks.length;

  if (tasks.length > 0 && undoneTasks.length ===0) { 
    counter.textContent = '';
    const celebrate = document.createElement('span');
    celebrate.id = 'remainingCount';
    counter.appendChild(document.createTextNode('🎉 All tasks done! Great job!'));
    counter.appendChild(celebrate);
    celebrate.textContent = '';// this is commented to check if counter is working
    counter.classList.add('all-complete');
    counter.style.color = '#388e3c';
    counter.style.fontWeight = '700';

    allDoneMsg.classList.add('visible');
  } else {
    counter.innerHTML = `Tasks remaining: <span id="remainingCount">${undoneTasks.length}</span> — ${doneCount} of ${tasks.length} tasks completed`;
    counter.style.color = '';
    counter.style.fontWeight = '';
    allDoneMsg.classList.remove('visible');
  }
}

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    errorMsg.textContent = 'Please type a task first';
    return;
  }

  const existingTexts = tasks.map(t => t.text.toLowerCase());
  if (existingTexts.includes(text.toLowerCase())) {
    errorMsg.textContent = 'This task already exists!';
    return;
  }

  errorMsg.textContent = '';
  tasks.push({ text: text, done: false });

  taskInput.value = '';
  render();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function clearAll() {
  tasks = [];
  errorMsg.textContent = '';
  render();
}
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

clearBtn.addEventListener('click', clearAll);
colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    document.body.style.backgroundColor = circle.dataset.color;

    colorCircles.forEach(c => c.classList.remove('active'));
    circle.classList.add('active');
  });
});
render();