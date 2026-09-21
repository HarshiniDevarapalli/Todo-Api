const todoRepository = require("../repositories/todoRepository");

const getTodos = async () => {
  return await todoRepository.findAll();
};

module.exports = getTodos;