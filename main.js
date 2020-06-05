//array for storing the values
let todos=[];

//get reference to the form
const addTodoForm=document.getElementById('addTodoForm');

//get reference to the button
const addInput=document.getElementById('addTodo');

//get reference to list-group
const listGroup=document.querySelector('.list-group');

//create the li element by taking todoValue
function createListItem(todoValue, todoIndex) {
  var li = document.createElement("li");
  
  li.setAttribute("class", "list-group-item d-flex justify-content-between");

  //checking the completed status on refresh
  if (todos[todoIndex].completed) {
    li.classList.add("bg-secondary");
  }
  
  //adding an event listener for changing the bg color to indicate completion status
  li.addEventListener("click", function() {
    if (todos[todoIndex].completed) {
      // Remove bg-secondary from Li
      li.classList.remove("bg-secondary");
      
      // set Completed to false
      todos[todoIndex].completed = false;
    } else {
      // add bg-secondary to Li
      li.classList.add("bg-secondary");
      
      // set completed true
      todos[todoIndex].completed = true;
    }
      //storing in local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  // create Span
  let span = document.createElement("span");
  
  span.innerHTML = todoValue;

  // Create Icon
  let icon = document.createElement("button");
  
  icon.innerHTML='X'
  
  icon.addEventListener("click", function(event) {
    
    //to not responding to the click pn parent element
    event.stopPropagation();
    
    //removing the row 
    event.target.parentElement.remove();
    
    todos.splice(todoIndex, 1);
    
    //store to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  
  //adding to the list 
  li.appendChild(span);
  
  li.appendChild(icon);

  return li;
}

//function which loops over the array , create li element and append it to dom
function renderTodos(todos){
  todos.forEach(function(todo,index){
    let li=createListItem(todo.value,index)
   
    listGroup.appendChild(li);
   
  })
}

//Check is todo Exist in LocalStorage
let storedTodos = localStorage.getItem("todos");

// if Exist
if (storedTodos) {
  let parsedStoredTodos = JSON.parse(storedTodos);
  
  todos = parsedStoredTodos;
 
 //calling the function that loops over the array
  renderTodos(todos);

}

//add event to the todoForm
addTodoForm.addEventListener("submit", function(event) {
  
 //stop the event
  event.preventDefault();

  let todoValue = addTodoForm.todo.value;

  //push it to the array
  todos.push({
    value: todoValue,
    completed: false,
 });
 
 //clearing the input field once adding the value
  addTodoForm.todo.value = "";

  //store to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
  
  let li = createListItem(todoValue, todos.length - 1);
 
  listGroup.appendChild(li);
});
