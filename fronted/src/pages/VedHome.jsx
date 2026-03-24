import React from "react";
import { Link } from "react-router-dom";
import "./CSS/VedHome.css"; 
import "./CSS/Hero.css"
import "./CSS/Article.css"
import { FaArrowRight } from "react-icons/fa6";

const VedHome = () => {
  return (
     <div className="ved_home_container">
      <section className="hero">

        <h1 className="hero-title title">
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

      {/* article */}
      <section className="article_container">
        <h1 className="title article_title">Article</h1>
        <div className="main_article">
          <div className="date-container">
            <p className="month">Jun</p>
            <p className="date">23</p>
          </div>
          <div className="left-article-section"><img src="https://images.unsplash.com/photo-1733331228241-19ac0593c1dc?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="right-article-section">
            <h2>Title of the Risen Event</h2>
            <p>1015 California Ave, Los Angeles CA  7:00 pm - 8:00 pm</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto blanditiis tenetur ullam suscipit! Reiciendis odio consequatur ipsa pariatur voluptas corporis!0</p>
            <hr />
            <button>View Event Details <FaArrowRight/></button>
          </div>
        </div>
        <hr />

        <div className="main_article">
          <div className="date-container">
            <p className="month">Jun</p>
            <p className="date">23</p>
          </div>
          <div className="left-article-section"><img src="https://plus.unsplash.com/premium_photo-1673697240073-04416dc18ab3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="right-article-section">
            <h2>Title of the Risen Event</h2>
            <p>1015 California Ave, Los Angeles CA  7:00 pm - 8:00 pm</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto blanditiis tenetur ullam suscipit! Reiciendis odio consequatur ipsa pariatur voluptas corporis!0</p>
            <hr />
            <button>View Event Details <FaArrowRight/></button>
          </div>
        </div>
        <hr />

        <div className="main_article">
          <div className="date-container">
            <p className="month">Jun</p>
            <p className="date">23</p>
          </div>
          <div className="left-article-section"><img src="https://images.unsplash.com/photo-1733331228241-19ac0593c1dc?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="right-article-section">
            <h2>Title of the Risen Event</h2>
            <p>1015 California Ave, Los Angeles CA  7:00 pm - 8:00 pm</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto blanditiis tenetur ullam suscipit! Reiciendis odio consequatur ipsa pariatur voluptas corporis!0</p>
            <hr />
            <button>View Event Details <FaArrowRight/></button>
          </div>
        </div>
        <hr />
        <div className="main_article">
          <div className="date-container">
            <p className="month">Jun</p>
            <p className="date">23</p>
          </div>
          <div className="left-article-section"><img src="https://images.unsplash.com/photo-1733331228241-19ac0593c1dc?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="right-article-section">
            <h2>Title of the Risen Event</h2>
            <p>1015 California Ave, Los Angeles CA  7:00 pm - 8:00 pm</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto blanditiis tenetur ullam suscipit! Reiciendis odio consequatur ipsa pariatur voluptas corporis!0</p>
            <hr />
            <button>View Event Details <FaArrowRight/></button>
          </div>
        </div>
        <hr />
        <div className="main_article">
          <div className="date-container">
            <p className="month">Jun</p>
            <p className="date">23</p>
          </div>
          <div className="left-article-section"><img src="https://images.unsplash.com/photo-1733331228241-19ac0593c1dc?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="right-article-section">
            <h2>Title of the Risen Event</h2>
            <p>1015 California Ave, Los Angeles CA  7:00 pm - 8:00 pm</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto blanditiis tenetur ullam suscipit! Reiciendis odio consequatur ipsa pariatur voluptas corporis!0</p>
            <hr />
            <button>View Event Details <FaArrowRight/></button>
          </div>
        </div>
        <hr />
      </section>
      
    </div>
  );
};

export default VedHome;