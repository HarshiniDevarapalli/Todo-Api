const express = require("express");

const {
  createTodo,
  getTodos,
  getTodoById,
} = require("../controllers/todoController");

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);

module.exports = router;