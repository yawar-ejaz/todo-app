const Users = require("../models/users");
const createToken = require("../utils/createToken");

const editUser = async (req, res, next) => {
  const { name, _id } = req.body;

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

module.exports = { editUser };
