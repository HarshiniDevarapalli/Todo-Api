
const getTodoById = (todoRepository) => {
  return async (id) => {
    return todoRepository.findById(id);
  };
};

module.exports = getTodoById;
