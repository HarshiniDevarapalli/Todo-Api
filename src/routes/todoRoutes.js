const express = require("express");

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);

module.exports = router;