// ============================================================
// To-Do List App Logic
// ============================================================

// R5 — Store tasks in an array of objects: { text, done }
let tasks = [];

// ── Grab elements ──
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const errorMsg = document.getElementById('errorMsg');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const remainingCount = document.getElementById('remainingCount');
const counter = document.getElementById('counter');
const allDoneMsg = document.getElementById('allDoneMsg');
const colorCircles = document.querySelectorAll('.color-circle');

// ── Render function: rebuilds the list from the tasks array ──
function render() {
  // Clear current list
  taskList.textContent = '';

  // Build each task item
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

// R4 + B3 + B4 — Update counters and style milestone
function updateCounter() {
  const undoneTasks = tasks.filter(t => !t.done);
  const doneCount = tasks.length - undoneTasks.length;

  remainingCount.textContent = undoneTasks.length;

  if (tasks.length > 0 && undoneTasks.length === 0) {
    // B4 — All tasks done style milestone
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

// R1 + B2 — Add a task
function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    errorMsg.textContent = 'Please type a task first';
    return;
  }

  // B2 — Prevent duplicates
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

// R2 — Toggle done/undone
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

// R3 — Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

// B1 — Clear all tasks
function clearAll() {
  tasks = [];
  errorMsg.textContent = '';
  render();
}

// ── Event listeners ──
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

clearBtn.addEventListener('click', clearAll);

// B5 — Color picker
colorCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    document.body.style.backgroundColor = circle.dataset.color;

    colorCircles.forEach(c => c.classList.remove('active'));
    circle.classList.add('active');
  });
});

// ── Initial render ──
render();