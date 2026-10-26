//const todoRepository = require("../repositories/todoRepository");

//const createTodo = async (data) => {
  //return await todoRepository.create(data);
//};

//module.exports = createTodo;


const createTodo = (todoRepository) => {
  return async (data) => {
    return todoRepository.create(data);
  };
};

module.exports = createTodo;
