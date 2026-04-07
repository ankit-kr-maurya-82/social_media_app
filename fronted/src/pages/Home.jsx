import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import { getFeedPosts } from "../lib/socialStore.js";
import UserContext from "../context/UserContext.js";
import "./CSS/Home.css";

const Home = () => {
  const posts = getFeedPosts();
  const { user } = useContext(UserContext);

  return (
    <div className="home-page">
      <section className="create-post-banner">
        <div>
          <p className="create-post-kicker">Community Feed</p>
          <h1>Share your next post with the community</h1>
          <p className="create-post-copy">
            Write a quick update, publish an article, or drop an image that
            deserves attention.
          </p>
        </div>
        <Link to={user ? "/create" : "/login"} className="create-post-cta">
          {user ? "Add Post" : "Login To Post"}
        </Link>
      </section>

      <Card posts={posts} />
    </div>
  );
};

export default Home;
