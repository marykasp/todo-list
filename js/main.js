window.addEventListener('load', () => {
  // global todo variable - get todos stored in local storage
  todos = JSON.parse(localStorage.getItem('todos')) || [];

  // SELECTORS
  const nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('#new-todo-form');

  // get the username and set the nameInput to that value
  const username = localStorage.getItem('username') || '';
  nameInput.value = username;

  // event listener on name input - store input value to localStorage
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem('username', e.target.value);
  })
  // div of todolist items
  const todoList = document.querySelector('#todo-list');




  // display todos
})
