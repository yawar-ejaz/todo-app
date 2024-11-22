const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const mongoose = require("mongoose");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Authorization token required.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        message: "Unauthorised user.",
      });
    }

    const user = await Users.findById(_id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorised user.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = auth;
