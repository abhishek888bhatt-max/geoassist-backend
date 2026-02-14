const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerUser, validateRegister } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", validateRegister, registerUser);

// PROTECTED PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
