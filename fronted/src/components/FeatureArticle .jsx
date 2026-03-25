import { FaArrowRight } from "react-icons/fa";
import "./CSS/FeatureArticle.css";

const articles = [
  {
    id: 1,
    title: "First Event",
    location: "California · 7:00 pm",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://plus.unsplash.com/premium_photo-1673697240073-04416dc18ab3?q=80&w=1170",
  },
  {
    id: 2,
    title: "Second Event",
    location: "New York · 8:00 pm",
    desc: "Another sample description for second card.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

const FeatureArticle = () => {
  return (
    <div className="article_container">
      {articles.map((item, index) => (
        <div
          className={`main_article ${index % 2 !== 0 ? "reverse" : ""}`}
          key={item.id}
        >
          {/* IMAGE */}
          <div className="left_container">
            <div className="left-article-section">
              <img src={item.image} alt={item.title} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="right-article-section">
            <h2>{item.title}</h2>
            <p className="meta">{item.location}</p>
            <p className="desc">{item.desc}</p>

            <hr />

            <button className="read_more_btn">
              View Event Details <FaArrowRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureArticle;