window.addEventListener('load', () => {
  // global todo variable - get todos stored in local storage
  todos = JSON.parse(localStorage.getItem('todos')) || [];
})
