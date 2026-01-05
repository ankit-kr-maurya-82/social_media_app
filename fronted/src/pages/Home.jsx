import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CSS/Home.css";

const dummyPosts = [
  {
    id: 1,
    title: "How to learn backend properly?",
    content: "I am learning Node.js, any roadmap suggestions?",
    author: "ankit_dev",
    avatar: "",
    votes: 12,
    comments: 4,
  },
  {
    id: 2,
    title: "React vs Vue in 2026",
    content: "Which one should I pick for long term?",
    author: "frontend_guy",
    avatar: "",
    votes: 8,
    comments: 2,
  },
];

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

  const handleVote = (id, type) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              votes: type === "up" ? post.votes + 1 : post.votes - 1,
            }
          : post
      )
    );
  };

  return (
    <div className="home-container">
      <div className="feed">
        {/* Create Post */}
        <div className="create-post" onClick={handleCreatePost}>
          <input
            type="text"
            placeholder={user ? "Create a post..." : "Login to create a post"}
            disabled
          />
        </div>

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
