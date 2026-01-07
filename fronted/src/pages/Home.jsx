import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CSS/Home.css";
import dummyPosts from "./dummyPosts.js";
import {FaArrowDown, FaArrowUp, FaHeart, FaRegComment, FaRegCommentDots, FaRegHeart, FaShare} from "react-icons/fa"

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dummyPosts);

 

  const handleVote = (id, vote) => {
    setPosts((prev) => prev.map((post) => {
      if(post._id !== id) return post;

      const newVote = post.userVote === vote? 0: vote;
      const diff = newVote - post.userVote;

      return{
        ...post,
        userVote: newVote,
        userVote: post.userVote + diff,
      }
    }))
  }

  return (
    <div className="home-container">
      <div className="feed">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            {/* Author */}
            <div className="post-author">
              <div className="avatar-fallback">
                {post.fullName.firstName.charAt(0)}
              </div>
              <div>
                <strong>
                  {post.fullName.firstName} {post.fullName.lastName}
                </strong>
                <span className="username">@{post.username}</span>
              </div>
            </div>

            {/* Content */}
            <p className="post-text">{post.content}</p>

            {/* Image */}
            {post.image && (
              <div className="post-image-wrapper">
                <img
                  src={post.image}
                  alt="post"
                  className="post-image"
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
                 <FaRegComment/>
                <span>Comment</span>
              </button>

              <button>
                <FaShare/>
                 <span>Share</span>
                 </button>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
};

export default Home;
