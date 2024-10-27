const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/authController");

router.route("/signup").post(createUser);
router.route("/login").post(login);

module.exports = router;
