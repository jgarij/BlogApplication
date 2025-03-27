const Blog = require("../models/Blog.model"); 
const User = require("../models/User.model"); 
const Comment = require("../models/Comment.model");

// Add a comment to a blog
const blogComment = async (req, res) => {
  try {
    const { id } = req.params; // Blog ID
    const { userId, text } = req.body; // User ID & Comment Text

    if (!userId || !text) {
      return res.status(400).json({ message: "User ID and text are required." });
    }

    // Check if the blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Create new comment
    const newComment = new Comment({ blog: id, user: userId, text });
    await newComment.save();

    res.status(201).json({ message: "Comment added successfully.", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment.", error: error.message });
  }
};

// Fetch all comments for a blog
const getComments = async (req, res) => {
    try {
      const { id } = req.params; // Blog ID
  
      // Validate blog ID format
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid Blog ID." });
      }
  
      const comments = await Comment.find({ blog: id })
        .populate("user", "name email")
        .sort({ createdAt: -1 });
  
      res.status(200).json({ success: true, comments });
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments.", error: error.message });
    }
  };

module.exports = { blogComment, getComments };
