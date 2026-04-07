import React from "react";
import { FaTrash } from "react-icons/fa";

const CommentItem = ({ comment, canDelete = false, onDelete }) => {
  const avatar = comment.user?.avatar || "https://via.placeholder.com/30";
  const name = comment.user?.name || comment.userName || "Anonymous";

  return (
    <div className="border overflow-hidden p-3 rounded bg-white">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
          <div>
            <span className="font-semibold block">{name}</span>
            {comment.user?.username && (
              <span className="text-xs text-slate-500">@{comment.user.username}</span>
            )}
          </div>
        </div>

        {canDelete && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-sm text-red-600 inline-flex items-center gap-1"
          >
            <FaTrash /> Delete
          </button>
        )}
      </div>

      <p className="text-sm text-slate-700">{comment.text}</p>
    </div>
  );
};

export default CommentItem;
