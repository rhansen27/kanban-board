// Retrieve tasks and nextId from localStorage
let taskList = retrieveTasks();
let nextID = localStorage.getItem("nextID");
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

  if (nextID) {
    curID = nextID;
  }
  nextID = Number(curID) + 1;
  localStorage.setItem("nextID", nextID);
  return curID;
}

// write a function to retrieve tasks from local storage
function retrieveTasks() {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  return taskList;
}
// save the tasks to local storage
function saveTasks(taskList) {
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
function renderTaskList() {
  const tasks = retrieveTasks();
  todoCards.empty();
  inProgressCards.empty();
  doneCards.empty();

  for (task of tasks) {
    const card = createTaskCard(task);
    if (task.status === "todo") {
      todoCards.append(card);
    } else if (task.status === "in-progress") {
      inProgressCards.append(card);
    } else {
      doneCards.append(card);
    }
  }

  $(".draggable").draggable({
    revert: "invalid",
    helper: "clone",
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const taskTitle = $("#taskTitle").val();
  const taskDate = $("#dueDate").val();
  const taskDescription = $("#taskDescription").val();

  if (!taskTitle || !taskDate || !taskDescription) {
    alert("Please fill out all fields");
    return;
  }

  let savedTask = retrieveTasks();

  const newTask = {
    id: generateTaskId(),
    title: taskTitle,
    date: taskDate,
    description: taskDescription,
    status: "todo",
  };

  taskList.push(newTask);
  saveTasks(taskList);
  var myModalEl = document.getElementById("formModal");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskID = $(event.target).closest(".card").data("id");

  const tasks = retrieveTasks();
  const tasksToSave = tasks.filter((task) => task.id !== taskID);
  saveTasks(tasksToSave);

  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const targetList = event.target.id.replace("-cards", "");
  const card = ui.draggable[0];
  const taskID = $(card).data("id");
  const tasks = retrieveTasks();
  for (const taskData of tasks) {
    if (taskData.id === taskID) {
      taskData.status = targetList;
    }
  }
  saveTasks(tasks);
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  taskForm.on("submit", handleAddTask);
  renderTaskList();
  $(".swim-lane").droppable({
    drop: handleDrop,
  });
  $("swim-lane").on("click", ".delete-task", handleDeleteTask);
});
