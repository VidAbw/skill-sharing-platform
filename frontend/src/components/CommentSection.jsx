import React, { useEffect, useState, useCallback } from "react";
import axios from "../api/axiosInstance";
import "../styles/CommentSection.css";

const CommentSection = ({
  postId,
  currentUserId,
  currentUserName,
  postOwnerId,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `/comments/post/${postId}?postOwnerId=${postOwnerId}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }, [postId, postOwnerId]);

  const handleAdd = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post("/comments", {
        content: newComment,
        userId: currentUserId,
        postId,
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await axios.delete(`/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;

    try {
      await axios.put(`/comments/${editCommentId}`, { content: editContent });
      setEditCommentId(null);
      setEditContent("");
      fetchComments();
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="comment-section">
      <h4 className="comment-title">Comments</h4>

      <div className="add-comment">
        <input
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="btn-post" onClick={handleAdd}>
          Post
        </button>
      </div>

      {comments.length === 0 && <p className="no-comments">No comments yet.</p>}

      {comments.map((c) => (
        <div key={c.id} className="comment-item">
          <div className="comment-header">
            <div className="comment-meta">
              <span className="comment-author">
                {c.userName || `User${c.userId}`}
              </span>
              <span className="comment-time">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>

            {(currentUserId === c.userId || currentUserId === c.postOwnerId) &&
              editCommentId !== c.id && (
                <div className="comment-actions">
                  {currentUserId === c.userId && (
                    <button className="btn-edit" onClick={() => handleEdit(c)}>
                      Edit
                    </button>
                  )}
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>

          {editCommentId === c.id ? (
            <div className="edit-comment">
              <input
                className="comment-edit-input"
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button className="btn-save" onClick={handleSaveEdit}>
                Save
              </button>
              <button
                className="btn-cancel"
                onClick={() => setEditCommentId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="comment-content">{c.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
