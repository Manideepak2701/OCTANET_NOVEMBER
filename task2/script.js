document.addEventListener('DOMContentLoaded', function () {
    showTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const priorityInput = document.getElementById('priorityInput');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task, it should not be empty.');
        return;
    }

    const task = {
        name: taskInput.value,
        date: dateInput.value,
        priority: priorityInput.value,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    dateInput.value = '';
    priorityInput.value = 'High';

    showTasks();
}

function deleteTask(index, completed = false) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (completed) {
        tasks = tasks.filter(task => task.completed);
    } else {
        tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];

    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const priorityInput = document.getElementById('priorityInput');

    taskInput.value = task.name;
    dateInput.value = task.date;
    priorityInput.value = task.priority;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    showTasks();
}

function toggleStatus(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}

function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
}


function filterTasks() {
    const priorityFilter = document.getElementById('priorityFilter').value;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (priorityFilter !== 'all') {
        tasks = tasks.filter(task => task.priority === priorityFilter);
    }

    showTasks(tasks);
}
function showTasks(tasks) {
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    tasks = tasks || JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.name} - ${task.date} - ${task.priority}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button class="complete-btn" onclick="completeTask(${index})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        li.className = task.completed ? 'completed' : '';

        if (task.completed) {
            completedTaskList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}
