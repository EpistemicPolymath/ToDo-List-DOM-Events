// DOM Events
// List of events: https://developer.mozilla.org/en-US/docs/Web/Events
// Keyboard + Mouse Events are the most relevant
// Let's select our button
// <button type="button" name="button">Click me!</button>

// var clickMeButton = document.getElementsByTagName("button")[0];
//
// // Let's listen to a "click" event
//
// clickMeButton.addEventListener("click", function() {
//     console.log("Clicked!!");
// })
//
// // "mouseenter" Event
// clickMeButton.addEventListener("mouseenter", function() {
//     console.log("Mouse Entered!!");
// })
//
// //"mouseleave" Event
// clickMeButton.addEventListener("mouseleave", function() {
//     console.log("Mouse Left!!");
// })

// Cache Variables

var enterButton = document.getElementById("enter");
var userInput = document.getElementById("userInput");
var todoList = document.querySelector("#todoList");
var todoListItems = document.querySelectorAll(".todoItem");
var deleteButtons = document.querySelectorAll(".delete");

// Functions for Refactoring Code (DRY - Do Not Repeat Yourself)

// Make functions for tasks that you repeat
function inputLength() {
    return userInput.value.length;
}

function createListElement() {
    // Now how do we add a new li item upon button click?
    var li = document.createElement("li");
    // Each element on a page has a text node - so we are creating that here
    li.appendChild(document.createTextNode(userInput.value + " "));
    // Add Class to new Todo List item
    li.setAttribute("class", "todoItem");
    // Let's create a button element
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.classList.add("delete");
    deleteButton.setAttribute("name", "button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteLiItemAfterClick(deleteButton);
    // Add button as child to li
    li.appendChild(deleteButton);
    // Let's add this new li item to our shopping list
    todoList.appendChild(li);
    addDoneClassAfterClick(li);
    // Clear out the value after adding it to the list
    userInput.value = "";
}

// We can extract even more functions
function addListAfterClick() {
    // Before we get into functionality it is always good to test
    // console.log("success!");

    // If input value is not greater than 0 do not add item to list
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeyPress(event) {
    // This will show you keyboard events on keypress with all of the available information.
    // console.log(event);
    // This which method shows you the keycode associated with the keypress So does event.keyCode
    // console.log(event.which);

    // If input value is not greater than 0 do not add item to list && keycode is 13 (The Enter key)then continue
    if (inputLength() > 0 && event.keyCode === 13) {
      createListElement();
    }
}

// On click of the Li items
function addDoneClassAfterClick(li) {
    li.addEventListener("click", function addDoneClassAfterLiClick(event) {
        li.classList.toggle("done");
    });
}

// Solution For This - https://stackoverflow.com/questions/50524683/delete-specific-list-item-from-unordered-list-when-delete-button-is-clicked
// Another source - http://archive.oreilly.com/oreillyschool/courses/javascript2/DeletingTodoListItems.html
// On click of the "Delete" deleteButtons
function deleteLiItemAfterClick(button) {
    button.addEventListener("click", function deleteLiItemAfterClick(event) {
        button.parentNode.remove();
    });
}


// On click of the "Enter" button
enterButton.addEventListener("click", addListAfterClick);

// On press of the "Enter" key while focused on the text input
userInput.addEventListener("keypress", addListAfterKeyPress);

// ForEach of Todo List Items
todoListItems.forEach(function(li) {
    addDoneClassAfterClick(li);
});

// ForEach of "Delete" Buttons
deleteButtons.forEach(function(button) {
    deleteLiItemAfterClick(button);
});
