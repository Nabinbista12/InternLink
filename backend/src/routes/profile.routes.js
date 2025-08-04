// routes/users.js
import express from "express";
import { getProfile, getUserProfile, updateProfile } from "../controller/profile.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Get current user's profile and their posts
router.get("/profile", verifyToken, getProfile);

// Get any user's profile by user ID (public view)
router.get("/profile/:userId", getUserProfile);

// Update current user's profile
router.put("/profile", verifyToken, updateProfile);

export default router;
