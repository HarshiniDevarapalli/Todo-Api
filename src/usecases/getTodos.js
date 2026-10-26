
const getTodos = (todoRepository) => {
  return async () => {
    return todoRepository.findAll();
  };
};

module.exports = getTodos;
