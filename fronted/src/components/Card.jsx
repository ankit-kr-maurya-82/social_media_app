import React from "react";
import "./CSS/Card.css";

const Card = ({ post }) => {
  return (
    <div className="post-card">
      {/* Vote */}
      <div className="post-vote">
        <button>▲</button>
        <span>{post.votes || 0}</span>
        <button>▼</button>
      </div>

      {/* Content */}
      <div className="post-body">
        <div className="post-header">
          <span className="post-author">
            u/{post.author || "anonymous"}
          </span>
          <span className="post-dot">•</span>
          <span className="post-time">2h ago</span>
        </div>

        <h3 className="post-title">{post.title}</h3>

        {post.content && (
          <p className="post-text">{post.content}</p>
        )}

        {/* Footer */}
        <div className="post-footer">
          <button>💬 {post.comments || 0} Comments</button>
          <button>🔗 Share</button>
          <button>⭐ Save</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
