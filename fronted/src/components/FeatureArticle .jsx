import { FaArrowRight } from "react-icons/fa";
import "./CSS/FeatureArticle.css";

const FeatureArticle = () => {
  return (
    <div className="main_article">
      
      {/* Date Badge */}
      <div className="date-container">
        <p className="month">Jun</p>
        <p className="date">23</p>
      </div>

      {/* Image */}
      <div className="left-article-section">
        <img
          src="https://plus.unsplash.com/premium_photo-1673697240073-04416dc18ab3?q=80&w=1170"
          alt="article"
        />
      </div>

      {/* Content */}
      <div className="right-article-section">
        <h2>Title of the Risen Event</h2>
        <p className="meta">
          1015 California Ave, Los Angeles CA · 7:00 pm - 8:00 pm
        </p>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          blanditiis tenetur ullam suscipit!
        </p>

        <hr />

        <button className="read_more_btn">
          View Event Details <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FeatureArticle;