'use strict'


let task = document.getElementById('task');
let styles = [];

// All tasks a day
let allTasksADay = document.querySelector('.all-tasks');
allTasksADay.addEventListener('click', function() {
    let animationCircle = document.querySelector('.animation-circle');
    animationCircle.style.display = 'none';
    let listOfTaskTitle = document.getElementById('list-of-task-title');
//    listOfTaskTitle.innerHTML = 'It is empty. Relax!';
    task.style.display = 'none';
    //task.setAttribute("disabled", "disabled");
    //task.setAttribute("placeholder", "To add a new task, click button");
    //task.style.backgroundColor = "lightpink";
    allTasksADay.style.display = 'none';
    addNewTask.style.display = 'block';
    let taskListBlock = document.querySelector('.task-list-block');
    taskListBlock.style.borderBottom = '0';
});

//Add new task

let addNewTask = document.querySelector('.add-new-task');
addNewTask.addEventListener('click', function() {
    	let animationCircle = document.querySelector('.animation-circle');
    	animationCircle.style.display = 'block';
    	//task.removeAttribute("disabled");
    	//task.setAttribute("placeholder", "Put your next task here");
    	//task.style.backgroundColor = "#FBFBFB";
    	task.style.display = 'block';
    	allTasksADay.style.display = 'block';
        addNewTask.style.display = 'none';
        let taskListBlock = document.querySelector('.task-list-block');
        taskListBlock.style.borderBottom = '1px dashed mediumvioletred';
});

// Clear all
let clearAllBtn = document.querySelector('.clear-all-tasks-btn');
clearAllBtn.addEventListener('click', function() {
        let modal = document.getElementById('modal-for-clearing-all');
	modal.style.display = 'block';
});
let btnYes = document.querySelector('#yes-btn');
btnYes.addEventListener('click', clearAll);
let btnNo = document.querySelector('#no-btn');
btnNo.addEventListener('click', function() {
	let modal = document.getElementById('modal-for-clearing-all');
	modal.style.display = 'none';
});

function createListItem(task) {
    let taskList = document.getElementById('task-list');
    let listItemBlock = document.createElement('div');
    let listItem = document.createElement('li');
    let buttonsBlock = document.createElement('div');
    let done = document.createElement('span');
    let tryLater = document.createElement('span');
    tryLater.addEventListener('click', function() {
	listItem.style.color = 'orange';
        listItem.style.textDecoration = 'none';
        done.style.display = 'block';
	failed.style.display = 'block';
        tryLater.style.display = 'none';
    });
    done.addEventListener('click', function() {
	listItem.style.color = 'green';
	listItem.style.textDecoration = 'line-through';
    });
    let failed = document.createElement('span');
    failed.addEventListener('click', function() {
	listItem.style.color = 'red';
        listItem.style.textDecoration = 'none';
        done.style.display = 'none';
	failed.style.display = 'none';
        tryLater.style.display = 'block';
    });
    let cross = document.createElement('span');
    cross.addEventListener('click', removeTaskFromLS);
    cross.addEventListener('click', deleteTask);
    buttonsBlock.appendChild(done);
    buttonsBlock.appendChild(failed);
    buttonsBlock.appendChild(tryLater);
    buttonsBlock.appendChild(cross);
    buttonsBlock.className = 'flex buttonsBlock';
    listItemBlock.className = 'flex list-item-block';
    done.innerHTML = 'done';
    done.className = 'done';
    tryLater.innerHTML = 'try later';
    tryLater.className = 'tryLater';
    failed.innerHTML = 'fail';
    failed.className = 'failed';
    cross.innerHTML = 'X';
    cross.className = 'cross';
    listItem.className = 'list-items';
    listItem.innerHTML = `${task}`;
    listItemBlock.appendChild(listItem);
    listItemBlock.appendChild(buttonsBlock);
    taskList.appendChild(listItemBlock);
}

function addTask() {
    if (event.keyCode == 13) {

        addTaskToLS(task.value);
        createListItem(task.value);

        task.value = null;
    }
}

document.addEventListener('DOMContentLoaded', showTaskFromLS);

function deleteTask(e) {
    //console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.style.display = 'none';
}

function clearAll() {
    let taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    let modal = document.getElementById('modal-for-clearing-all');
    modal.style.display = 'none';
    removeAllTasksFromLS();
}

// Local Storage

function getTaskFromLS() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function addTaskToLS(taskName) {
    const tasks = getTaskFromLS();
    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTaskFromLS() {
    const tasks = getTaskFromLS();
    tasks.forEach((task) => {
        createListItem(task);
    })
}

function removeTaskFromLS(e) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
	let indexOfCurrentTask = tasks.indexOf(e.target.parentElement.parentElement.children[0].textContent);
        tasks.splice(indexOfCurrentTask, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeAllTasksFromLS(e) {
    localStorage.clear();
}
