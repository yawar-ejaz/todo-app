const jwt = require("jsonwebtoken");

const createToken = (_id, name, email, dateJoined) => {

  return jwt.sign({ _id, name, email, dateJoined }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = createToken;
