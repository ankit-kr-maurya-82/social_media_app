import React from "react";
import "./card.css";

const Card = ({ post }) => {
  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <img
          src={post.avatar || "/default-avatar.png"}
          alt="avatar"
          className="post-avatar"
        />
        <div>
          <h4 className="post-username">{post.username}</h4>
          <span className="post-time">2h ago</span>
        </div>
      </div>

      {/* Content */}
      <div className="post-content">
        <p>{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="post-image"
          />
        )}
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button>❤️ Like</button>
        <button>💬 Comment</button>
        <button>↗ Share</button>
      </div>
    </div>
  );
};

export default Card;
