const express = require("express");

const { createTodo } = require("../controllers/todoController");

const router = express.Router();

router.post("/", createTodo);

module.exports = router;