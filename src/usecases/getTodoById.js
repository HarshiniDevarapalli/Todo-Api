const todoRepository = require("../repositories/todoRepository");

const getTodoById = async (id) => {
  return await todoRepository.findById(id);
};

module.exports = getTodoById;