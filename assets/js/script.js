// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// also manages task's individual unique identifiers
// So if nextId isn't created, it initializes it with value "1". Otherwise nextId is incremented by 1.
// After updating, thr new value is stored in localStorage under the nextID key and returns the updated nextID.
function generateTaskId() {
  if (nextId === null) {
    nextId = 1;
  } else {
    nextId++;
  }
  localStorage.setItem("nextID", JSON.stringify(nextId));
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // to prevent default action of event lister before task is created
  event.preventDefault();
  // Task object
  const newTask = {
    id: generateTaskId(),
    taskTitle: $("#taskTitle").val(),
    description, $('#taskDescription').val(),
    dueDate, $('#datePicker').val(),
    status: 'To Do',
  };
// For adding new tasks to taskList, saving and rendering on screen
taskList.push(newTask);
localStorage.setItem('newTasks', JSON.stringify(taskList));
renderTaskList();
$('taskTitle').val('');
$('description').val('');
$('dueDate').val('');

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});

$(function () {
  $("#datePicker").datepicker();
  $("#anim").on("change", function () {
    $("#datePicker").datepicker("option", "showAnim", $(this).val());
  });
});
