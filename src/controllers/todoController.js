const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
            message: "Title is required",
        });
    }

    const todo = await Todo.create({
      title,
      description,
      completed,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create todo",
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
  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid Todo ID",
    });
  }

    res.status(500).json({
    message: "Failed to fetch todo",
    });
  }
};


const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    const updates = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    const todo = await Todo.findByIdAndUpdate(
      id,
      updates,
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
  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid Todo ID",
    });
  }

    res.status(500).json({
    message: "Failed to update todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid Todo ID",
    });
    }

    res.status(500).json({
    message: "Failed to delete todo",
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};