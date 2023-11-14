export const filterTodos = (todos, tab) => {
  if (tab == 'all') {
    return todos;
  } else if (tab == 'active') {
    return todos.filter((item) => !item.isComplete);
  } else if (tab == 'complete') {
    return todos.filter((item) => item.isComplete);
  } else {
    return [];
  }
};
