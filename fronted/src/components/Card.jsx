import React, { useState, useContext } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaCommentDots, FaUserPlus, FaUserCheck } from "react-icons/fa";
import UserContext from "../context/UserContext";
import "./CSS/Card.css";

const Card = ({ post }) => {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);

  const toggleLike = () => setLiked(prev => !prev);
  const toggleFollow = () => {
    if (!user) {
      alert("Login to follow authors");
      return;
    }
    setFollowing(prev => !prev);
  };

  const handleComment = () => alert("Open comments section");
  const handleChat = () => {
    if (!user) {
      alert("Login to chat with author");
      return;
    }
    alert("Open chat with author");
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied!");
  };

  return (
    <div className="post-card">
      <div className="post-body">
        <div className="post-header">
          <span className="post-author">u/{post.author || "anonymous"}</span>
          <span className="post-dot">•</span>
          <span className="post-time">2h ago</span>
        </div>

        <h3 className="post-title">{post.title}</h3>
        {post.content && <p className="post-text">{post.content}</p>}

        <div className="post-footer">
          {/* Like */}
          <button className={`footer-btn ${liked ? "liked" : ""}`} onClick={toggleLike}>
            {liked ? <FaHeart /> : <FaRegHeart />} Like
          </button>

          {/* Comment */}
          <button className="footer-btn" onClick={handleComment}>
            <FaComment /> Comment
          </button>

          {/* Share */}
          <button className="footer-btn" onClick={handleShare}>
            <FaShare /> Share
          </button>

          {/* Chat */}
          <button className="footer-btn" onClick={handleChat}>
            <FaCommentDots /> Chat
          </button>

          {/* Follow */}
          <button className={`footer-btn follow-btn ${following ? "following" : ""}`} onClick={toggleFollow}>
            {following ? <FaUserCheck /> : <FaUserPlus />} {following ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
