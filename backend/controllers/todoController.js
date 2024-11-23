const mongoose = require("mongoose");
const Users = require("../models/users");
const Todos = require("../models/todos");
const { request } = require("express");

const addTodo = async (req, res, next) => {
  const { title, description } = req.body;
  const { _id } = req.user;
  if (!title || !description || !_id) {
    return res.status(400).json({
      message: "All fields are mandatory!",
    });
  }

  try {
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(400).json({
        message: "No such user exists.",
      });
    }
    const todo = await Todos.create({
      title,
      description,
      userId: _id,
    });

    // const todos = await Todos.find({ userId });
    res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add todo.",
    });
  }
};

const fetchTodos = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(400).json({
        message: "No such user exists.",
      });
    }

    const todos = await Todos.find({ userId: _id }).sort({ createdAt: -1 });
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed fetch todos",
    });
  }
};

const toggleTodo = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const todo = await Todos.findOne({ _id });
    if (!todo) {
      return res.status(400).json({
        message: "No such todo exists",
      });
    }
    todo.isCompleted = !todo.isCompleted; // Toggle the isCompleted status
    await todo.save();
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating todo.",
    });
  }
};

const deleteTodo = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const todo = await Todos.findOne({ _id });
    if (!todo) {
      return res.status(400).json({
        message: "No such todo exists",
      });
    }
    await Todos.deleteOne({ _id });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting todo.",
    });
  }
};

module.exports = {
  addTodo,
  fetchTodos,
  deleteTodo,
  toggleTodo,
};
