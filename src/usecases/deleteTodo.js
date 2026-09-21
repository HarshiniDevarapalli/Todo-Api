const todoRepository = require("../repositories/todoRepository");

const deleteTodo = async (id) => {
  return await todoRepository.remove(id);
};

module.exports = deleteTodo;