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
};

// Todo: create a function to create a task card - takes "newTask" object as the argument
function createTaskCard(newTask) {
// created article element to house task card and added class for sizing and the id property from the newTask object
  const taskCard = $('article').addClass('card w-75 task-card draggable my-3').attr('data-task-id', newTask.id);
  // the following variables make up the task card elements and respective sizing/attributes
  const taskCardHeader = $('div').addClass('card-header h3').text(newTask.taskTitle);
  const taskCardBody = $('div').addClass('card-body');
  const taskCardDescription = $('p').addClass('card-text').text(newTask.description);
  const taskCardDueDate = $('p').addClass('card-text').text(newTask.dueDate);
  // Button to delete the task and color along with text, and the id property from the newTask object. Also on-click event listener to link button to deletion
  const taskCardDeleteButton = $('button').addClass('btn btn-danger delete').text('Delete Task').attr('data-task-id', newTask.id);
  taskCardDeleteButton.on('click', handleDeleteTask)
// Due-date/Card color correlation algorithm
if (newTask.dueDate && newTask.status !== 'done'){
  const currentDate = dayjs();
  const taskDueDate = dayjs(task.dueDate, 'M/DD/YYYY');
  if(now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDueDate)){
    taskCard.addClass('bg-danger text-white');
    taskCardDeleteButton.addClass('border-light')
  }
}
};

// Todo: create a function to render the task list and make cards draggable
// Initializes an empty array called taskList if it does'nt already exist
function renderTaskList() {
  if (!taskList){
    taskList = [];
  }
  // selecting variables to represent different status task cards and empties content for each
  const todoCards = $('#todo-cards');
  todoCards.empty();

  const inProgressCards = $('#in-progress-cards');
  inProgressCards.empty();

  const doneCards = $('#done-cards');
  doneCards.empty();

};

// iterates through each task in the taskList array and makes cards per status (for loop)
for (let task of taskList) {
  if (task.status === 'to-do') {
    todoCards.append(createTaskCard(task));
  } else if (task.status === 'in-progress') {
    inProgressCards.append(createTaskCard(task));
  } else if (task.status === 'done') {
    doneCards.append(createTaskCard(task));
  }
};

//make cards draggable


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
