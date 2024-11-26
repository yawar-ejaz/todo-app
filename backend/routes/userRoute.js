const express = require("express");
const router = express.Router();
const { editUserName, changePassword } = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.route("/name").patch(auth, editUserName);
router.route("/password").patch(auth, changePassword);

module.exports = router;
