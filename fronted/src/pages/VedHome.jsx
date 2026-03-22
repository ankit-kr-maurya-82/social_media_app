import React from "react";
import { Link } from "react-router-dom";
import "./CSS/VedHome.css"; 
import "./CSS/Hero.css"

const VedHome = () => {
  return (
     <div className="ved_home_container">
      <section className="hero">

        <h1 className="hero-title">
          Write, Share & Grow
        </h1>

        <p className="hero-subtitle">
          Publish articles, explore ideas, and connect with developers around the world.
        </p>

        <div className="hero-actions">
          <button className="btn primary">Start Writing</button>
          <button className="btn secondary">Explore Articles</button>
        </div>

      </section>
    </div>
  );
};

export default VedHome;