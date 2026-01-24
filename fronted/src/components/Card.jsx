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
            <Link className="post-title"
            to={`/post/${post.username}`}>{post.title}</Link><br />
            <Link className="post-text">{post.content}</Link>
            
          

           
           
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Card;
