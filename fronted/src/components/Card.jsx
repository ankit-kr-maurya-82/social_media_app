import React, { useState } from "react";

const Card = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likesCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-5 shadow-lg hover:border-slate-700 transition">

      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={post.avatar || "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"}
          alt="avatar"
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="text-white text-sm font-semibold">
            {post.fullName.firstName} {post.fullName.lastName}
          </h3>
          <p className="text-xs text-gray-400">@{post.username}</p>
        </div>

        <button className="text-gray-400 hover:text-white text-xl">⋯</button>
      </div>

      {/* Content */}
      <p className="text-gray-200 text-sm mt-3 leading-relaxed">
        {post.content}
      </p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-4 rounded-xl w-full max-h-[420px] object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">

        <div className="flex gap-5">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition ${
              liked ? "text-red-500" : "hover:text-red-400"
            }`}
          >
            ❤️ {likes}
          </button>

          <button className="hover:text-blue-400 transition">
            💬 Comment
          </button>

          <button className="hover:text-green-400 transition">
            🔁 Repost
          </button>
        </div>

        <button className="hover:text-yellow-400 transition">
          🔖 Save
        </button>
      </div>
    </div>
  );
};

export default Card;
