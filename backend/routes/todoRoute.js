const express = require("express");
const router = express.Router();
const { addTodo, fetchTodos, deleteTodo } = require("../controllers/todoController");

router.route("/add").post(addTodo);
router.route("/fetch/:userId").get(fetchTodos);
router.route("/delete/:id").delete(deleteTodo);

module.exports = router;
