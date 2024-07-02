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

// Todo: create a function to create a task card - takes "newTask" object as the argument
function createTaskCard(newTask) {
  // created article element to house task card and added class for sizing and the id property from the newTask object
  const taskCard = $("article")
    .addClass("card w-75 task-card draggable my-3")
    .attr("data-task-id", newTask.id);
  // the following variables make up the task card elements and respective sizing/attributes
  const taskCardHeader = $("div")
    .addClass("card-header h3")
    .text(newTask.taskTitle);
  const taskCardBody = $("div").addClass("card-body");
  const taskCardDescription = $("p")
    .addClass("card-text")
    .text(task.description);
  const taskCardDueDate = $("p").addClass("card-text").text(newTask.dueDate);
  // Button to delete the task and color along with text, and the id property from the newTask object. Also on-click event listener to link button to deletion
  const taskCardDeleteButton = $("button")
    .addClass("btn btn-danger delete")
    .text("Delete Task")
    .attr("data-task-id", newTask.id);
  taskCardDeleteButton.on("click", handleDeleteTask);
  // Due-date/Card color correlation algorithm
  if (newTask.dueDate && newTask.status !== "done") {
    const currentDate = dayjs();
    const taskDueDate = dayjs(newTask.dueDate, "M/DD/YYYY");
    if (currentDate.isSame(taskDueDate, "day")) {
      taskCard.addClass("bg-warning text-white");
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass("bg-danger text-white");
      taskCardDeleteButton.addClass("border-light");
    }
  }
  // Apending card elements
  taskCardBody.append(
    taskCardDescription,
    taskCardDueDate,
    taskCardDeleteButton
  );
  taskCard.append(taskCardHeader, taskCardBody);

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
// Initializes an empty array called taskList if it does'nt already exist
function renderTaskList() {
  if (!taskList) {
    taskList = [];
  }
  // selecting variables to represent different status task cards and empties content for each
  const todoCards = $("#todo-cards");
  todoCards.empty();

  const inProgressCards = $("#in-progress-cards");
  inProgressCards.empty();

  const doneCards = $("#done-cards");
  doneCards.empty();
}

// iterates through each task in the taskList array and makes cards per status (for loop)
for (let task of taskList) {
  if (task.status === "to-do") {
    todoCards.append(createTaskCard(task));
  } else if (task.status === "in-progress") {
    inProgressCards.append(createTaskCard(task));
  } else if (task.status === "done") {
    doneCards.append(createTaskCard(task));
  }
}

//make cards draggable
// initializes draggable feature for elements with the .draggable class
$(".draggable").draggable({
  //to ensure cards appear on top of other elements
  zIndex: 100,
  helper: function (event) {
    // helper function to clone dragged cards so the original card stays in place, then checks the target of the drag event
    // if it's the original card, it will be cloned, else, the parent card (.ui-draggable) will be cloned
    const originalCard = $(event.target).hasClass("ui-draggable")
      ? $(event.target)
      : $(event.target).closest(".ui-draggable");
    return originalCard.clone().css({
      // cloned element's max width set to match original element's outer width
      maxWith: originalCard.outerWidth(),
    });
  },
});

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // to prevent default action of event lister before task is created
  event.preventDefault();
  // Task object
  const newTask = {
    id: generateTaskId(),
    taskTitle: $("#taskTitle").val(),
    description: $("#taskDescription").val(),
    dueDat: $("#datePicker").val(),
    status: "To Do",
  };
  // For adding new tasks to taskList, saving and rendering on screen
  taskList.push(newTask);
  localStorage.setItem("newTasks", JSON.stringify(taskList));
  renderTaskList();
  $("taskTitle").val("");
  $("description").val("");
  $("dueDate").val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  const taskId = $(this).attr("data-task-id");
  // Using filter method to create an array to exclude "taskID"
  taskList = taskList.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(taskList));
  // Updates UI with the new task list
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Extracting attribute value from the first draggable element
  const taskID = ui.draggable[0].dataset.taskID;
  // Gets the id of the drop target
  const updatedCardStatus = event.target.id;
  // To iterate through each task  in the taskList Array and changes status based on where it's dropped
  for (let task of taskList) {
    if (task.id === parseInt(taskID)) {
      task.status = updatedCardStatus;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#taskForm").on("submit", handleAddTask);
  // Makes lanes droppable
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });

  $("#datePicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
