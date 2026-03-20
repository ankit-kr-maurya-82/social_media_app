import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <div className="border overflow-hidden p-3 rounded">
      <div className="flex items-center gap-2 mb-1">
        <img
          src={comment.user?.avatar || "https://via.placeholder.com/30"}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">
          {comment.user?.name || "Anonymous"}
        </span>
      </div>

      <p className="text-sm">{comment.text}</p>
    </div>
  );
};

export default CommentItem;