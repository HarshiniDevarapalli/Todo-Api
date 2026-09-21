const todoRepository = require("../repositories/todoRepository");

const updateTodo = async (id, updates) => {
  return await todoRepository.update(id, updates);
};

module.exports = updateTodo;