
const TodoController = require("../domain/contracts/TodoController");

class ExpressTodoController extends TodoController {
  constructor(todoUseCases) {
    super();
    this.todoUseCases = todoUseCases;

    // Preserve the correct `this` context when Express calls handlers.
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async createTodo(req, res) {
    try {
      const { title, description, completed } = req.body;

      const todo = await this.todoUseCases.createTodo({
        title,
        description,
        completed,
      });

      return res.status(201).json(todo);
    } catch (error) {
      if (
        error.name === "ValidationError" ||
        error.message === "Title is required"
      ) {
        return res.status(400).json({
          error: "Invalid todo data",
        });
      }

      console.error("Create Todo Error:", error);

      return res.status(500).json({
        error: "Failed to create todo",
      });
    }
  }

  async getTodos(req, res) {
    try {
      const todos = await this.todoUseCases.getTodos();

      return res.status(200).json(todos);
    } catch (error) {
      console.error("Get Todos Error:", error);

      return res.status(500).json({
        error: "Failed to fetch todos",
      });
    }
  }

  async getTodoById(req, res) {
    try {
      const { id } = req.params;

      const todo = await this.todoUseCases.getTodoById(id);

      if (!todo) {
        return res.status(404).json({
          error: "Todo not found",
        });
      }

      return res.status(200).json(todo);
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid Todo ID",
        });
      }

      console.error("Get Todo By ID Error:", error);

      return res.status(500).json({
        error: "Failed to fetch todo",
      });
    }
  }

  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const updates = {};

      if (title !== undefined) {
        updates.title = title;
      }

      if (description !== undefined) {
        updates.description = description;
      }

      if (completed !== undefined) {
        updates.completed = completed;
      }

      const todo = await this.todoUseCases.updateTodo(id, updates);

      if (!todo) {
        return res.status(404).json({
          error: "Todo not found",
        });
      }

      return res.status(200).json(todo);
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid Todo ID",
        });
      }

      if (
        error.name === "ValidationError" ||
        error.message === "Title is required"
      ) {
        return res.status(400).json({
          error: "Invalid todo data",
        });
      }

      console.error("Update Todo Error:", error);

      return res.status(500).json({
        error: "Failed to update todo",
      });
    }
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.params;

      const todo = await this.todoUseCases.deleteTodo(id);

      if (!todo) {
        return res.status(404).json({
          error: "Todo not found",
        });
      }

      return res.status(200).json({
        message: "Todo deleted successfully",
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid Todo ID",
        });
      }

      console.error("Delete Todo Error:", error);

      return res.status(500).json({
        error: "Failed to delete todo",
      });
    }
  }
}

module.exports = ExpressTodoController;
