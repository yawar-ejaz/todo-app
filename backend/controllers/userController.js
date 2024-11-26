const Users = require("../models/users");
const createToken = require("../utils/createToken");
const { encrypt, isMatching } = require("../utils/hashing");

const editUserName = async (req, res, next) => {
  const { name } = req.body;
  const { _id } = req.user;

  if (!_id || !name) {
    return res.status(400).json({
      message: "All fields are Mandatory!",
    });
  }
  try {
    const user = await Users.findOneAndUpdate(
      { _id },
      {
        name: name
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    const token = createToken(user._id, user.name, user.email, user.dateJoined);

    return res.status(200).json({
      message: "User updated successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update user details!",
    });
  }
};

const changePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const { _id } = req.user;
  try {
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(400).json({
        message: "No such user exists.",
      });
    }

    if (!(await isMatching(password, user.password))) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    user.password = await encrypt(newPassword);
    await user.save();
    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to change password!",
    });
  }
};

module.exports = { editUserName, changePassword };
