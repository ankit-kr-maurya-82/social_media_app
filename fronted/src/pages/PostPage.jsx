import React, { act, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CSS/PostPage.css";
import dummyPosts from "./dummyPosts.js";
import {
  FaArrowDown,
  FaArrowUp,
  FaHeart,
  FaRegComment,
  FaRegCommentDots,
  FaRegComments,
  FaRegHeart,
  FaShare,
  FaTimes,
} from "react-icons/fa";
import FollowBtn from "../components/FollowBtn.jsx";
import Comments from "../components/Comments/Comments.jsx";

const PostPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dummyPosts);
  const [openComments, setOpenComments] = useState(null);
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
          userVote: newVote,
        };
      })
    );
  };

  return (
    <div className="home-container">
      <div className="feed">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            {/* Title Content */}
            <h1 className="post-title">{post.title}</h1>
            <h2 className="post-text">{post.content}</h2>

            {/* Author */}
            <Link to={`/profile/${post.username}`} className="post-author">
              {post.avatar ? (
                <img src={post.avatar} alt="avatar" className="post-avatar" />
              ) : (
                <div className="avatar-fallback">
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
            <FollowBtn />
{post.media && (
  <div className="post-media">
    {post.media.type === "image" ? (
      <img
        src={post.media.url}
        alt="post"
        className="post-image"
        onClick={() => setActiveMedia(post.media)}
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
            {/* Actions */}
            <div className="post-actions">
              <button
                onClick={() =>
                  setOpenComments(openComments === post._id ? null : post._id)
                }
                className="comment-btn"
              >
                <FaRegComments size={20} />
              </button>
            </div>

            {/* Comments Toggle */}
            {openComments === post._id && <Comments postId={post._id} />}

            {/* Content */}

            <p>
              Boost Productivity with Free Open-Source Software | Developer
              Tools That Replace Paid Alternatives. I used to believe good
              software must be paid software. Monthly invoices. Annual renewals.
              “Pro” badges everywhere. Non members-LINK But somewhere between
              side projects, client work, and long nights debugging, I slowly
              replaced almost everything with free & open-source tools. Not as
              an experiment -but because they actually worked better. This is
              not a list from the internet. These are tools I open every single
              day. 1. VS Code — My Daily Work Desk VS Code is a lightweight but
              powerful code editor that supports almost every programming
              language. It’s fast, extensible, and works the same on Windows,
              Linux, and macOS.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
