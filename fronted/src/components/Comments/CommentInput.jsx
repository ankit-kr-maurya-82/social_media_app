import React, { useState } from "react";

const CommentInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onAdd(text);
    setText("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;