const Todo = require("../models/Todo");

const create = async (todoData) => {
  return await Todo.create(todoData);
};

const findAll = async () => {
  return await Todo.find();
};

const findById = async (id) => {
  return await Todo.findById(id);
};

const update = async (id, updates) => {
  return await Todo.findByIdAndUpdate(
    id,
    updates,
    {
      new: true,
      runValidators: true,
    }
  );
};

const remove = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};