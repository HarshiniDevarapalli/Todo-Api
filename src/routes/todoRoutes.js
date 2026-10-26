
const express = require("express");

const {
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
} = require("../middleware/validateTodo");

const createTodoRoutes = (todoController) => {
  const router = express.Router();

  router.post(
    "/",
    validateCreateTodo,
    todoController.createTodo
  );

  router.get("/", todoController.getTodos);

  router.get(
    "/:id",
    validateTodoId,
    todoController.getTodoById
  ); 

  router.put(
    "/:id",
    validateTodoId,
    validateUpdateTodo,
    todoController.updateTodo
  );

  router.delete(
    "/:id",
    validateTodoId,
    todoController.deleteTodo
  );

  return router;
};

module.exports = createTodoRoutes;
