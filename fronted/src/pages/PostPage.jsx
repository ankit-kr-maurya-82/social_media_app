import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import "./CSS/PostPage.css";
import { FaPlus } from "react-icons/fa";
import Comments from "../components/Comments/Comments.jsx";
import { getPostById } from "../lib/socialStore.js";

const PostPage = () => {
  const { postId } = useParams();
  const activePost = useMemo(() => getPostById(postId), [postId]);

  if (!activePost) {
    return <div className="home-container">Post not found.</div>;
  }

  return (
    <div className="home-container">
      <div className="create-post-header">
        <Link to="/create" className="create-post-btn">
          <FaPlus /> Create Post
        </Link>
      </div>

      <div className="main-content">
        <div className="feed">
          <div className="post-card" key={activePost._id}>
            <h1 className="post-title">{activePost.title}</h1>
            <p className="post-text">{activePost.content}</p>

            <Link to={`/profile/${activePost.username}`} className="post-author">
              {activePost.avatar ? (
                <img src={activePost.avatar} alt="avatar" className="post-avatar" />
              ) : (
                <div className="avatar-fallback">{activePost.fullName.charAt(0)}</div>
              )}

              <div>
                <strong>{activePost.fullName}</strong>
                <span>@{activePost.username}</span>
              </div>
            </Link>

            {activePost.media && (
              <div className="post-media">
                {activePost.media.type === "image" ? (
                  <img
                    src={activePost.media.url}
                    alt="post"
                    className="post-image"
                  />
                ) : (
                  <video
                    src={activePost.media.url}
                    controls
                    className="post-video"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="comments-panel">
          <div className="sidebar-author">
            {activePost.avatar ? (
              <img
                src={activePost.avatar}
                alt="avatar"
                className="sidebar-avatar"
              />
            ) : (
              <div className="avatar-fallback">{activePost.fullName.charAt(0)}</div>
            )}

            <div>
              <strong>{activePost.fullName}</strong>
              <p>@{activePost.username}</p>
            </div>
          </div>

          <h2 className="sidebar-title">{activePost.title}</h2>
          <p className="sidebar-content">{activePost.content}</p>
          <Comments postId={activePost.id || activePost._id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
