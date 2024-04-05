// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextID = JSON.parse(localStorage.getItem("nextId"));

const taskForm = $("#inputForm");
const taskTitle = $("#taskTitle");
const taskDate = $("#dueDate");
const taskDescription = $("#taskDescription");

const todoCards = $("#todo-cards");
const inProgressCards = $("#in-progress-cards");
const doneCards = $("#done-cards");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  let curID = 1;

  if (nextId) {
    curID = nextId;
  }
  nextID = Number(curID) + 1;
  localStorage.setItem("nextID", nextID);
  return curID;
}

// write a function to retrieve tasks from local storage
function retieveTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}
// save the tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Todo: create a function to get the time until a task is due
function getTaskTime(task) {
  const taskDate = dayjs(task.date);
  const today = dayjs().format("YYYY-MM-DD");

  const daysUntilDue = taskDate.diff(today, "day");
  if (task.status === "done") {
    return "Finished";
  } else if (daysUntilDue === 0) {
    return "Due Today";
  } else if (daysUntilDue < 0) {
    return `${Math.abs(daysUntilDue)} days overdue`;
  } else {
    return `${daysUntilDue} days until due`;
  }
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const timeUntilDue = getTaskTime(task);
  const card = $(`
    <div class="card draggable task-card ${timeUntilDue}" data-id="${task.id}" data-status="${task.status}">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text">${task.date}</p>
            <button class="btn btn-danger delete-task">Delete</button>
            </div>
            </div>`);
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
