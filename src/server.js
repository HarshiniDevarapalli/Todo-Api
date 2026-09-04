const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const todoRoutes = require("./routes/todoRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

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

app.use("/todos", todoRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});