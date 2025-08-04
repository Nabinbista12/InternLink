
import Post from "../models/post.models.js";

// Create a post (protected route - need JWT middleware)
export const savePost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id; // assuming user id from JWT middleware

    if (!text) return res.status(400).json({ message: "Text is required" });

    const post = new Post({ author: userId, text });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts with author info (public)
export const getPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username name") // only username & name of author
      .sort({ createdAt: -1 }); // latest posts first

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
