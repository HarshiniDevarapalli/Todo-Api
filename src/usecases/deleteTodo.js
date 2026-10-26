
const deleteTodo = (todoRepository) => {
  return async (id) => {
    return todoRepository.remove(id);
  };
};

module.exports = deleteTodo;
