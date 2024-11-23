const Users = require("../models/users");
const { encrypt, isMatching } = require("../utils/hashing");
const createToken = require("../utils/createToken");

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
      name: name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      email,
      password: await encrypt(password),
    });

    const token = createToken(user._id, user.name, user.email, user.dateJoined);
    res.status(201).json({
      token,
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
    if (await isMatching(password, user.password)) {
      const token = createToken(
        user._id,
        user.name,
        user.email,
        user.dateJoined
      );
      res.status(200).json({
        token,
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
