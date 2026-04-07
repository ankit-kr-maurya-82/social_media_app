import React from "react";
import { Link } from "react-router-dom";
import "./CSS/VedHome.css";
import "./CSS/Hero.css";
import "./CSS/Article.css";
import FeatureArticle from "../components/FeatureArticle.jsx";

const VedHome = () => {
  return (
    <div className="ved_home_container">
      <section className="hero">
        <h1 className="hero-title title">Write, Share & Grow</h1>

        <p className="hero-subtitle">
          Publish articles, explore ideas, and connect with developers around
          the world.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn primary">
            Start Writing
          </Link>
          <Link to="/explore" className="btn secondary">
            Explore Articles
          </Link>
        </div>
      </section>

      <FeatureArticle />
    </div>
  );
};

export default VedHome;
