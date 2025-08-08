// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// POST /api/v1/user/register
router.post("/register", async (req, res) => {
  try {
    // Normalize inputs
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").toLowerCase().trim();
    const password = req.body.password || "";

    // Validate payload
    const { error } = registerValidation({ name, email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password & create user
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashPassword });
    await user.save();

    // Respond with safe user fields
    return res.status(201).json({
      message: "Registered",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/v1/user/login
router.post("/login", async (req, res) => {
  try {
    const email = (req.body.email || "").toLowerCase().trim();
    const password = req.body.password || "";

    const { error } = loginValidation({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    // keep the legacy header if you rely on it
    res.setHeader("auth-token", token);

    return res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
