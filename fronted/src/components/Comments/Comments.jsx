import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  // Fetch comments per post
  useEffect(() => {
    // Replace with your API later
    // fetch(`/api/comments/${postId}`)
    //   .then(res => res.json())
    //   .then(data => setComments(data));

    // Temporary mock
    setComments([
      {
        id: 1,
        text: "Comment for post " + postId,
        user: { name: "User1" }
      }
    ]);
  }, [postId]);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      text,
      user: { name: "CurrentUser" }
    };

    setComments([newComment, ...comments]);

    // Backend call (later)
    /*
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, postId })
    });
    */
  };

  return (
    <div className="mt-3">
      <CommentInput onAdd={handleAddComment} />

      <div className="space-y-2">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </div>
  );
};

export default Comments;