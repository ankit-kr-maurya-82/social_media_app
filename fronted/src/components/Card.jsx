import React, { act, useContext, useState } from "react";
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
  const { user } = useContext(UserContext);
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
    <div className="home-container">
      <div className="feed">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            {/* Author */}
            <Link
            to={`/profile/${post.username}`}
             className="post-author">
              {post.avatar? (
                <img
                src={post.avatar}
                alt="avatar"
                className="post-avatar"/>
              ): (
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

            {/* Content */}
            <p className="post-text">{post.content}</p>

            {/* Image */}
            {post.image && (
              <div
                className="post-image-wrapper"
                onClick={() =>
                  setActiveMedia({ type: "image", src: post.image })
                }
              >
                <img src={post.image} alt="post" className="post-image" />
              </div>
            )}

            {/* Video */}
            {post.video && (
              <div
                className="post-image-wrapper"
                onClick={() =>
                  setActiveMedia({ type: "video", src: post.video })
                }
              >
                <video
                  src={post.video}
                  className="post-image"
                  playsInline
                  controls
                  autoPlay
                  muted={false}
                  preload="metadata"
                />
              </div>
            )}

            {/* Footer */}
            <div className="post-footer reddit-vote">
              <button
                className={post.userVote === 1 ? "upvoted" : ""}
                onClick={() => handleVote(post._id, 1)}
              >
                <FaArrowUp />
              </button>

              <span className="vote-count">{post.userVote}</span>

              <button
                className={post.userVote === -1 ? "downvoted" : ""}
                onClick={() => handleVote(post._id, -1)}
              >
                <FaArrowDown />
              </button>

              <button onClick={() => navigate(`/post/${post._id}`)}>
                <FaRegComment />
                {/* <span>Comment</span> */}
              </button>

              <button>
                <FaShare />
                {/* <span>Share</span> */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeMedia && (
        <div
          className="image-modal-overlay"
          onClick={() => setActiveMedia(null)}
        >
          <button
            className="image-modal-close"
            onClick={() => setActiveMedia(null)}
          >
            <FaTimes />
          </button>
          {activeMedia.type === "image" ? (
            <img
              src={activeMedia.src}
              className="image-modal-img"
              alt="fullscreen"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={activeMedia.src}
              className="image-modal-img"
              controls
              autoPlay
              muted={false}
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
