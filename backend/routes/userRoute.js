const express = require("express");
const router = express.Router();
const { editUser } = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.route("/").patch(auth, editUser);

module.exports = router;
