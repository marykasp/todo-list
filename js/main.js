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

  // event listener - form submission
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

    // check if user entered a content and category name - if not show an error message

    // add todo to global todos array
    todos.push(todo);

    // turn global todos list into a JSON string to store in local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // reset form
    e.target.reset()

    // Display todos to app
    displayTodos();
    console.log(todos)
  })

  // display todos in local storage when window loads
  displayTodos();
})

// FUNCTIONS
const displayTodos = () => {
  // select todo list div that contains the todo items
  const todoList = document.querySelector('#todo-list');

  todoList.innerHTML = '';

  // have access to global todos array variable where the todo items are stored - iterate over each todo and create a new todoItem
  todos.forEach(todo => {
    // create an element for each todo
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // label with input and span
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');

    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button')


    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');
    // change classList of span based on category
    if(todo.category === 'personal') {
      span.classList.add('personal')
    } else {
      span.classList.add('work')
    }
    // append input and span to label element - children
    label.appendChild(input);
    label.appendChild(span)

    content.classList.add('todo-content');
    actions.classList.add('todo-actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly />`

    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    // append edit and delete buttons to actions div
    actions.appendChild(edit);
    actions.appendChild(deleteButton);

    // append label, content, and actions to todoItem
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    // append new todoItem to todoList
    todoList.appendChild(todoItem)

    // strikethrough todo if checked
    if(todo.done) {
      todoItem.classList.add('done')
    }

    // add event listener to checkbox input to check if todo item is done
    input.addEventListener('click', e => {
      todo.done = e.target.checked;
      // update todos on local storage since todo property was updated
      localStorage.setItem('todos', JSON.stringify(todos))

      if(todo.done) {
        todoItem.classList.add('done')
      } else {
        todoItem.classList.remove('done')
      }

      // redisplay updated todos
      displayTodos()
    })


    // add event listener to edit button
    edit.addEventListener('click', e => {
      // turn the todo-content input to not readonly
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      // when click outside of input field will stop editing
      input.addEventListener('blur', e => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
      })

    })

    // add event listener to delete button
    deleteButton.addEventListener('click', e => {
      // only keep todos that do not equal the todo clicked on - todo clicked on is removed from the global todos array
      todos = todos.filter(t => t != todo);
      // reset the todos in local storage
      localStorage.setItem('todos', JSON.stringify(todos));
      displayTodos();
    })
  })
}
