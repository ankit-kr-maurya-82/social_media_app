import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import api from "../../api/axios";
import {
  addComment as addLocalComment,
  deleteLocalComment,
  getComments as getLocalComments,
  getCurrentUser,
} from "../../lib/socialStore";

const normalizeComment = (comment) => ({
  id: comment._id || comment.id,
  text: comment.content || comment.text,
  createdAt: comment.createdAt,
  userId: comment.owner?._id || comment.userId || null,
  userName:
    comment.owner?.fullName ||
    comment.user?.name ||
    comment.userName ||
    "Anonymous",
  user: {
    name:
      comment.owner?.fullName ||
      comment.user?.name ||
      comment.userName ||
      "Anonymous",
    avatar: comment.owner?.avatar || comment.user?.avatar || "",
    username: comment.owner?.username || comment.user?.username || "",
  },
});

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = getCurrentUser();

  useEffect(() => {
    let cancelled = false;

    const loadComments = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/comments/post/${postId}`);
        if (!cancelled) {
          setComments((response.data.comments || []).map(normalizeComment));
        }
      } catch {
        if (!cancelled) {
          setComments(getLocalComments(postId).map(normalizeComment));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadComments();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  const handleAddComment = async (text) => {
    setError("");

    try {
      const response = await api.post(`/comments/post/${postId}`, {
        content: text,
      });
      setComments((prev) => [normalizeComment(response.data.comment), ...prev]);
    } catch {
      try {
        setComments(addLocalComment(postId, text).map(normalizeComment));
      } catch (localError) {
        setError(localError.message || "Unable to add comment.");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    setError("");

    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch {
      try {
        setComments(deleteLocalComment(postId, commentId).map(normalizeComment));
      } catch (localError) {
        setError(localError.message || "Unable to delete comment.");
      }
    }
  };

  return (
    <div className="mt-3">
      <CommentInput onAdd={handleAddComment} disabled={!currentUser} />

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      {loading && <p className="text-sm text-slate-500 mb-3">Loading comments...</p>}
      {!loading && comments.length === 0 && (
        <p className="text-sm text-slate-500 mb-3">No comments yet.</p>
      )}

      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            canDelete={currentUser?.id === comment.userId}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
