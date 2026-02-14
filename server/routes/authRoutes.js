const express = require("express");
const { loginUser, registerUser, validateLogin, validateRegister } = require("../controllers/userController");

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
