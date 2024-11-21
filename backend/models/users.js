const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  next();
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
