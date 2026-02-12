const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", registerUser);

// PROTECTED PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const User = require("../models/User");
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
