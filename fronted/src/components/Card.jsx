import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Card.css";
import dummyPosts from "./dummyPosts.js";
import { FaArrowRight, FaTimes } from "react-icons/fa";

const Card = ({ posts: propPosts, post: singlePost }) => {
  const navigate = useNavigate();
  const posts = Array.isArray(propPosts)
    ? propPosts
    : singlePost
      ? [singlePost]
      : dummyPosts;
  const [activeMedia, setActiveMedia] = useState(null);

  return (
    <>
      <div className="feed">
        {posts.map((post, index) => (
          <div
            className={`main_article ${index % 2 !== 0 ? "reverse" : ""}`}
            key={post.id || post._id}
          >
            <div className="left_container">
              <div className="left-article-section">
                {post.media ? (
                  post.media.type === "image" ? (
                    <img
                      src={post.media.url}
                      alt="post media"
                      onClick={() => setActiveMedia(post.media)}
                    />
                  ) : (
                    <video
                      src={post.media.url}
                      controls
                      onClick={() => setActiveMedia(post.media)}
                    />
                  )
                ) : (
                  <div className="no-media">No Media</div>
                )}
              </div>
            </div>

            <div className="right-article-section">
              <Link to={`/profile/${post.username}`} className="post-author">
                {post.avatar ? (
                  <img
                    src={post.avatar}
                    alt="avatar"
                    className="post-avatar-small"
                  />
                ) : (
                  <div className="avatar-fallback-small">
                    {post.fullName?.charAt(0)}
                  </div>
                )}
                <div>
                  <strong className="userfullname">{post.fullName}</strong>
                  <span className="username">@{post.username}</span>
                </div>
              </Link>

              <h2
                className="post-title-link"
                onClick={() => navigate(`/post/${post.id || post._id}`)}
                style={{ cursor: "pointer" }}
              >
                {post.title}
              </h2>

              {post.tags && (
                <div className="post-tags">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="desc">{post.content}</p>

              {post.readTime && <div className="read-time">{post.readTime}</div>}

              <hr />

              <button
                className="read_more_btn"
                onClick={() => navigate(`/post/${post.id || post._id}`)}
              >
                Read Full Post <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

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
};

export default Card;
