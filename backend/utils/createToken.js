const jwt = require("jsonwebtoken");

const createToken = (id, name, email, dateJoined) => {

  return jwt.sign({ id, name, email, dateJoined }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = createToken;
