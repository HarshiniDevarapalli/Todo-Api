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

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({
      message: "Invalid Todo ID",
    });
  }
};


const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
};