const express = require("express");
const router = express.Router();
const { addTodo, fetchTodos, deleteTodo, toggleTodo } = require("../controllers/todoController");


router.route("/").post(addTodo);
router.route("/:userId").get(fetchTodos);
router.route("/:id").delete(deleteTodo);
router.route("/:id").patch(toggleTodo);

module.exports = router;
