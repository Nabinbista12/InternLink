// routes/posts.js (Express router)
import express from "express";
import { getPost, savePost } from "../controller/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Create a post (protected route - need JWT middleware)
router.post("/save", verifyToken, savePost);

// Get all posts with author info (public)
router.get("/getpost", getPost);

export default router;
