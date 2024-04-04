// declare variables
const $swimLane = $(".swimlane");
const $taskList = $("#task-list");

// create a function to get localStorage data
function getLocalStorageData() {
  // get tasks and nextId from localStorage
  // if there is no data in localStorage, set tasks and nextId to empty arrays
  const taskList = JSON.parse(localStorage.getItem("tasks") || []);
  const taskID = JSON.parse(localStorage.getItem("nextId") || []);

  return taskList;
  return nextId;
}
// create a function to set localStorage data
function setLocalStorageData(taskList, nextId) {
  // set tasks and nextId to localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Todo: create a function to generate a unique task id
function generateId() {
  let newId = nextId.id;
  nextId.id++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card =
    $(`<div class="card draggable" data-id="${nextId.id} data-status=${task.status}">
  <div class="card-body">
    <h5 class="card-title">${task.title}</h5>
    <p class="card-text">${task.description}</p>
    <p class="card-text">${task.dueDate}</p>
    <button class="btn btn-danger delete">Delete</button>`);
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task

// Todo: create a function to handle deleting a task

// Todo: create a function to handle dropping a task into a new status lane

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
