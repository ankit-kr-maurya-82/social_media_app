import React, { useState } from "react";

const CommentInput = ({ onAdd, disabled = false }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || disabled) return;

    onAdd(text);
    setText("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder={disabled ? "Login to add a comment..." : "Add a comment..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 rounded"
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        className="bg-slate-900 text-white px-4 rounded"
        disabled={disabled}
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
