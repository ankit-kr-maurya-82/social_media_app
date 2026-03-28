import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CSS/Card.css";
import dummyPosts from "./dummyPosts.js";
import {
  FaArrowDown,
  FaArrowUp,
  FaHeart,
  FaRegComment,
  FaRegCommentDots,
  FaRegHeart,
  FaShare,
  FaTimes,
} from "react-icons/fa";

const Card = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dummyPosts);

  const [activeMedia, setActiveMedia] = useState(null); // image or video

  const handleVote = (id, vote) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id !== id) return post;

        const newVote = post.userVote === vote ? 0 : vote;
        const diff = newVote - post.userVote;

        return {
          ...post,
          // userVote: newVote,
          userVote: post.userVote + diff,
        };
      })
    );
  };

  return (
    <>
    <div className="feed">
        {posts.map((post, index) => (
          <div
            className={`main_article ${index % 2 !== 0 ? "reverse" : ""}`}
            key={post._id}
          >
            {/* IMAGE */}
            <div className="left_container">
              <div className="left-article-section">
                {post.media ? (
                  post.media.type === "image" ? (
                    <img src={post.media.url} alt="post media" onClick={() => setActiveMedia(post.media)} />
                  ) : (
                    <video src={post.media.url} controls onClick={() => setActiveMedia(post.media)} />
                  )
                ) : (
                  <div className="no-media">No Media</div>
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="right-article-section">
              <Link to={`/profile/${post.username}`} className="post-author">
                {post.avatar ? (
                  <img src={post.avatar} alt="avatar" className="post-avatar-small" />
                ) : (
                  <div className="avatar-fallback-small">
                    {post.fullName.firstName.charAt(0)}
                  </div>
                )}
                <div>
                  <strong className="userfullname">
                    {post.fullName.firstName} {post.fullName.lastName}
                  </strong>
                  <span className="username">@{post.username}</span>
                </div>
              </Link>

              <h2 className="post-title-link" onClick={() => navigate(`/post/${post.username}`)} style={{cursor: 'pointer'}}>
                {post.title}
              </h2>

              {post.tags && (
                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
              )}

              <p className="desc">{post.content}</p>

              {post.readTime && (
                <div className="read-time">{post.readTime}</div>
              )}

              <hr />

              {/* Footer */}
              <div className="post-footer">
                <div className="reddit-vote">
                  <button
                    onClick={() => handleVote(post._id, 1)}
                    className={post.userVote === 1 ? "upvoted" : ""}
                  >
                    <FaArrowUp />
                  </button>
                  <span>{post.votes || 0}</span>
                  <button
                    onClick={() => handleVote(post._id, -1)}
                    className={post.userVote === -1 ? "downvoted" : ""}
                  >
                    <FaArrowDown />
                  </button>
                </div>
                <button className="action-btn">
                  <FaRegComment /> {post.comments || 0}
                </button>
                <button className="action-btn">
                  <FaShare />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Modal */}
      {activeMedia && (
        <div className="media-modal" onClick={() => setActiveMedia(null)}>
          <div className="media-content">
            <button className="close-btn" onClick={() => setActiveMedia(null)}>
              <FaTimes />
            </button>
            {activeMedia.type === "image" ? (
              <img src={activeMedia.url} alt="media" />
            ) : (
              <video src={activeMedia.url} controls />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
