import React from "react";

const CommentItem = ({ comment }) => {
  const avatar = comment.user?.avatar || "https://via.placeholder.com/30";
  const name = comment.user?.name || comment.userName || "Anonymous";

  return (
    <div className="border overflow-hidden p-3 rounded">
      <div className="flex items-center gap-2 mb-1">
        <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        <span className="font-semibold">{name}</span>
      </div>

      <p className="text-sm">{comment.text}</p>
    </div>
  );
};

export default CommentItem;
