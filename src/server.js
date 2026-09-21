const express = require("express"); //express
const dotenv = require("dotenv");  //environment variables
const morgan = require("morgan");  //

const todoRoutes = require("./routes/todoRoutes");
const connectDB = require("./config/db");  

dotenv.config(); //This loads the variables from .env into process.env. 

const app = express();  //creates express application 

app.use(express.json()); //middleware to parse incoming JSON requests to access incoming data through req.body
app.use(morgan("dev"));  //This provides request logging during development

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
}); 

app.use("/todos", todoRoutes);  //mounts the todoRoutes router on the /todos path, so all routes defined in todoRoutes will be prefixed with /todos.

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {            
  console.log(`Server running on port ${PORT}`);
}); // This starts the Express server and makes it listen for incoming requests. 