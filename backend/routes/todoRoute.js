const express = require("express");
const router = express.Router();
const {
  addTodo,
  fetchTodos,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");
const auth = require("../middlewares/auth");

router.route("/").post(auth, addTodo);
router.route("/:userId").get(auth, fetchTodos);
router.route("/:_id").delete(auth, deleteTodo);
router.route("/").patch(auth, toggleTodo);

module.exports = router;
