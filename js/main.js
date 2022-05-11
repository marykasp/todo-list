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
  });

  newTodoForm.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(e.target.elements)
    const todo = {
      // input with name content, get the value
      content: e.target.elements.content.value,
      // input with name category
      category: e.target.elements.category.value,
      done: false,
      createAt: new Date().getTime()
    }

    // add todo to global todos array
    todos.push(todo)

    // turn todos list into a JSON string to store in local storage
    localStorage.setItem('todos', JSON.stringify(todos))
  })
  // div of todolist items
  const todoList = document.querySelector('#todo-list');




  // display todos
})
