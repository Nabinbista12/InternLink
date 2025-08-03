import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users.models.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (assuming you have a method to compare passwords)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token (assuming you have a method to generate tokens)
    const id = user.id;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  console.log("register called");
  try {
    let { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    const existingUserByEmail = await User.find({ email });
    if (existingUser || existingUserByEmail.length > 0) {
      return res.status(400).json({
        message: existingUser
          ? "Username already exists"
          : "Email already exists",
      });
    }

    password = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
