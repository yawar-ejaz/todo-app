const mongoose = require("mongoose");
const Users = require("../models/users");

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are Mandatory!",
    });
  }
  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email id already exists",
      });
    }

    const user = await Users.create({
      name,
      email,
      password,
    });

    // const token = createToken(user._id);
    res.status(201).json({
      //   token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add user to the database!",
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are Mandatory!",
    });
  }
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "No such user exists",
      });
    }
    if (user.password === password) {
      // const token = createToken(user._id);
      res.status(200).json({
        //   token,
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed fetch user from the database!",
    });
  }
};

module.exports = {
  createUser,
  login,
};