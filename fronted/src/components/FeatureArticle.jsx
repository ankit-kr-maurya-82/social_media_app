import { FaArrowRight } from "react-icons/fa";
import "./CSS/FeatureArticle.css";

const articles = [
  {
    id: 1,
    title: "Creator Economy Notes",
    location: "Remote Event | Weekly",
    desc: "A short-form series on writing, audience building, and staying consistent without burning out.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Designing Better Social Feeds",
    location: "Product Session | Friday",
    desc: "Learn how strong content hierarchy and thoughtful motion can make a simple feed feel premium.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1170&auto=format&fit=crop",
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
          <div className="left_container">
            <div className="left-article-section">
              <img src={item.image} alt={item.title} />
            </div>
          </div>

          <div className="right-article-section">
            <h2>{item.title}</h2>
            <p className="meta">{item.location}</p>
            <p className="desc">{item.desc}</p>

            <hr />

            <button className="read_more_btn">
              Explore Session <FaArrowRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureArticle;
