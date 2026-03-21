import React from "react";
import { Link } from "react-router-dom";
import "./CSS/VedHome.css";

const VedHome = () => {
  return (
    <div className="ved_home_container">

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to DevConnect</h1>
        <p>Share posts, explore videos, connect with developers</p>

        <div className="hero-buttons">
          <Link to="/posts" className="btn">Explore Posts</Link>
          <Link to="/videos" className="btn secondary">Watch Videos</Link>
        </div>
      </section>

      {/* Feed Preview */}
      <section className="home-preview">
        <h2>Trending Posts</h2>

        <div className="preview-cards">
          <div className="preview-card">Post 1</div>
          <div className="preview-card">Post 2</div>
          <div className="preview-card">Post 3</div>
        </div>

        <Link to="/posts" className="view-more">View More →</Link>
      </section>

      {/* Video Preview */}
      <section className="home-preview">
        <h2>Trending Videos</h2>

        <div className="preview-cards">
          <div className="preview-card">Video 1</div>
          <div className="preview-card">Video 2</div>
        </div>

        <Link to="/videos" className="view-more">Watch More →</Link>
      </section>

    </div>
  );
};

export default VedHome;