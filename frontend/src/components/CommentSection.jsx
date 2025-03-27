import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5173/api/blog/comment/${blogId}`).then((res) => {
      setComments(res.data.comments);
    });
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Assuming user is logged in

    if (!commentText.trim()) return;

    const { data } = await axios.post(`http://localhost:5173/api/blog/comment/${blogId}`, {
      userId,
      text: commentText,
    });

    setComments([...comments, data.comment]);
    console.log(data.comment)
    setCommentText("");
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <p key={comment._id}><strong>{comment.user.name}:</strong> {comment.text}</p>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CommentSection;
