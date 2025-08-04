// routes/users.js
import User from "../models/users.models.js";
import Post from "../models/post.models.js";

// Get current user's profile and their posts
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Comes from decoded JWT token

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get any user's profile by user ID (public view)
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update current user's profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio; // Allow empty bio

    const user = await User.findByIdAndUpdate(userId, updateData, { 
      new: true,
      runValidators: true 
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


