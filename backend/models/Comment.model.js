const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Reply Schema (optional for better scaling)
const replySchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

// Comment Schema
const commentSchema = new Schema(
  {
    blog: { type: mongoose.Types.ObjectId, ref: "Blog", required: true }, // Blog ID
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // User who commented
    text: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Users who liked the comment
    replies: [{ type: mongoose.Types.ObjectId, ref: "Reply" }], // Store reply references
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Models
const Comment = mongoose.model("Comment", commentSchema);
const Reply = mongoose.model("Reply", replySchema);

module.exports = { Comment, Reply };
