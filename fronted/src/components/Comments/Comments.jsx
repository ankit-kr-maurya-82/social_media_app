import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import { addComment, getComments } from "../../lib/socialStore";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(getComments(postId));
  }, [postId]);

  const handleAddComment = (text) => {
    setComments(addComment(postId, text));
  };

  return (
    <div className="mt-3">
      <CommentInput onAdd={handleAddComment} />

      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
