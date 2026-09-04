const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.create({
      title,
      description,
      completed,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
};