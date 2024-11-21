const express = require("express");
const router = express.Router();
const { editUser } = require("../controllers/userController");

router.route("/:id").patch(editUser);
module.exports = router;
