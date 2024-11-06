const mongoose = require("mongoose");
const Users = require("../models/users");
const Todos = require("../models/todos");
const { request } = require("express");

const addTodo = async (req, res, next) => {
  const { title, description, userId } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({
      message: "All fields are mandatory!",
    });
  }

  try {
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "No such user exists.",
      });
    }
    const todo = await Todos.create({
      title,
      description,
      userId,
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
  const { userId } = req.params;

  try {
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        message: "No such user exists.",
      });
    }

    const todos = await Todos.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed fetch todos",
    });
  }
};

const toggleTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findOne({ _id: id });
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
  const { id } = req.params;
  try {
    const todo = await Todos.findOne({ _id: id });
    if (!todo) {
      return res.status(400).json({
        message: "No such todo exists",
      });
    }
    await Todos.deleteOne({ _id: id });
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
