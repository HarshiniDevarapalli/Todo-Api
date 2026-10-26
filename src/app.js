
const express = require("express");
const morgan = require("morgan");

const TodoModel = require("./infrastructure/database/TodoModel");
const MongoTodoRepository = require("./repositories/todoRepository");
const DynamoTodoRepository = require("./repositories/DynamoTodoRepository");

const createTodo = require("./usecases/createTodo");
const getTodos = require("./usecases/getTodos");
const getTodoById = require("./usecases/getTodoById");
const updateTodo = require("./usecases/updateTodo");
const deleteTodo = require("./usecases/deleteTodo");

const ExpressTodoController = require("./controllers/todoController");
const createTodoRoutes = require("./routes/todoRoutes"); //

const app = express();

// 1. Configure middleware
app.use(express.json());
app.use(morgan("dev"));

// 2. Select the repository based on DB_PROVIDER
let todoRepository;

if (process.env.DB_PROVIDER === "dynamodb") {
  todoRepository = new DynamoTodoRepository();
  console.log("Using DynamoDB repository");
} else {
  todoRepository = new MongoTodoRepository(TodoModel);
  console.log("Using MongoDB repository");
}

// 3. Create the use cases
const todoUseCases = {
  createTodo: createTodo(todoRepository),
  getTodos: getTodos(todoRepository),
  getTodoById: getTodoById(todoRepository),
  updateTodo: updateTodo(todoRepository),
  deleteTodo: deleteTodo(todoRepository),
};

// 4. Inject use cases into the controller
const todoController = new ExpressTodoController(todoUseCases);

// 5. Inject the controller into the routes
const todoRoutes = createTodoRoutes(todoController);

// 6. Register the router
app.use("/todos", todoRoutes);

// Health endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
