filter.addEventListener("change", (e) => {
  // get option selected
  const filterChoice = e.target.value;
  if(filterChoice === 'all') {
    todoItem.classList.remove('filtered')
  }

  if(filterChoice === 'complete' && todo.done === true) {
    todoItem.classList.remove('filtered')
  } else {
    todoItem.classList.add('filtered')
  }

  if(filterChoice === 'incomplete' && todo.done === false) {
    todoItem.classList.remove('filtered')
  } else {
    todoItem.classList.add('filtered')
  }
})
