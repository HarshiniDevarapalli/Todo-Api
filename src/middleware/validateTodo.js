
const validateCreateTodo = (req, res, next) => {
  const { title, description, completed } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return res.status(400).json({
      message: "Description must be a string",
    });
  }

  if (
    completed !== undefined &&
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "Completed must be a boolean",
    });
  }

  next();
};

const validateUpdateTodo = (req, res, next) => {
  const { title, description, completed } = req.body ?? {};

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res.status(400).json({
      message: "Title cannot be empty",
    });
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return res.status(400).json({
      message: "Description must be a string",
    });
  }

  if (
    completed !== undefined &&
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "Completed must be a boolean",
    });
  }

  next();
};


const mongoose = require("mongoose");
const { validate: isValidUUID } = require("uuid");

const validateTodoId = (req, res, next) => {
  const { id } = req.params;

  const isValidId =
    mongoose.isValidObjectId(id) || isValidUUID(id);

  if (!isValidId) {
    return res.status(400).json({
      message: "Invalid Todo ID",
    });
  }

  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
};
