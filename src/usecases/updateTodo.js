
const updateTodo = (todoRepository) => {
  return async (id, updates) => {
    return todoRepository.update(id, updates);
  };
};

module.exports = updateTodo;
