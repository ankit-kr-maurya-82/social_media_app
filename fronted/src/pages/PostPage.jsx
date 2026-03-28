import React, { useState } from "react";
import "./CSS/PostPage.css";
import dummyPosts from "./dummyPosts.js";
import { FaRegComments, FaTimes } from "react-icons/fa";
import FollowBtn from "../components/FollowBtn.jsx";
import Comments from "../components/Comments/Comments.jsx";

const PostPage = () => {
  const [posts] = useState(dummyPosts);

  // ✅ store full post
  const [activePost, setActivePost] = useState(null);

  return (
    <div className="home-container">

      {/* LEFT SIDE - FEED */}
      <div className="feed">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            
            {/* TITLE */}
            <h1 className="post-title">{post.title}</h1>
            <p className="post-text">{post.content}</p>

            {/* AUTHOR */}
            <Link to={`/profile/${post.username}`} className="post-author">
              {post.avatar ? (
                <img src={post.avatar} alt="avatar" className="post-avatar" />
              ) : (
                <div className="avatar-fallback">
                  {post.fullName.firstName.charAt(0)}
                </div>
              )}

              <div>
                <strong>
                  {post.fullName.firstName} {post.fullName.lastName}
                </strong>
                <span>@{post.username}</span>
              </div>
            </Link>

            <FollowBtn />

            {/* MEDIA */}
            {post.media && (
              <div className="post-media">
                {post.media.type === "image" ? (
                  <img
                    src={post.media.url}
                    alt="post"
                    className="post-image"
                  />
                ) : (
                  <video
                    src={post.media.url}
                    controls
                    className="post-video"
                  />
                )}
              </div>
            )}

            {/* ACTIONS */}
            <div className="post-actions">
              <button
                onClick={() =>
                  setActivePost(
                    activePost?._id === post._id ? null : post
                  )
                }
                className="comment-btn"
              >
                <FaRegComments size={20} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* RIGHT SIDE - COMMENTS PANEL */}
      {activePost && (
        <div className="comments-panel">

          {/* CLOSE BUTTON */}
          <button
            className="close-btn"
            onClick={() => setActivePost(null)}
          >
            <FaTimes />
          </button>

          {/* PROFILE */}
          <div className="sidebar-author">
            {activePost.avatar ? (
              <img
                src={activePost.avatar}
                alt="avatar"
                className="sidebar-avatar"
              />
            ) : (
              <div className="avatar-fallback">
                {activePost.fullName.firstName.charAt(0)}
              </div>
            )}

            <div>
              <strong>
                {activePost.fullName.firstName}{" "}
                {activePost.fullName.lastName}
              </strong>
              <p>@{activePost.username}</p>
            </div>
          </div>

          {/* TITLE */}
          <h2 className="sidebar-title">{activePost.title}</h2>

          {/* CONTENT */}
          <p className="sidebar-content">{activePost.content}</p>

          {/* MEDIA */}
          {activePost.media?.type === "image" && (
            <img
              src={activePost.media.url}
              alt="post"
              className="sidebar-image"
            />
          )}

          {activePost.media?.type === "video" && (
            <video
              src={activePost.media.url}
              controls
              className="sidebar-video"
            />
          )}

          {/* COMMENTS */}
          <Comments postId={activePost._id} />
          
        </div>
      )}
    </div>
  );
};

export default PostPage;