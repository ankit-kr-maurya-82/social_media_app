import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CSS/Home.css";
import dummyPosts from "./dummyPosts.js";


const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dummyPosts);

  const handleCreatePost = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/create-post");
  };

 

  return (
    <div className="home-container">
      <div className="feed">
        

        {/* Posts */}
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            {/* Votes */}
            <div className="vote-section">
              <button onClick={() => handleVote(post.id, "up")}>⬆</button>
              <span>{post.votes}</span>
              <button onClick={() => handleVote(post.id, "down")}>⬇</button>
            </div>

            {/* Content */}
            <div
              className="post-content"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {/* Author */}
              <div className="post-author">
                {post.avatar ? (
                  <img src={post.avatar} alt="avatar" />
                ) : (
                  <div className="avatar-fallback">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>u/{post.author}</span>
              </div>

              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-footer">
                <span>{post.comments} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
