const express = require("express");
const router = express.Router();
const { editUser } = require("../controllers/userController");

router.route("/").patch(editUser);
module.exports = router;
