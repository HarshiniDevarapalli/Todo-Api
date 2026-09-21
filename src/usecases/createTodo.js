const todoRepository = require("../repositories/todoRepository");

const createTodo = async (data) => {
  return await todoRepository.create(data);
};

module.exports = createTodo;