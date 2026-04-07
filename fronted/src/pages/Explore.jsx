import React, { useState } from "react";
import "./CSS/Explore.css";
import Card from "../components/Card";
import { searchPosts } from "../lib/socialStore";

const Explore = () => {
  const [query, setQuery] = useState("");
  const filteredPosts = searchPosts(query);

  return (
    <div className="explore-page">
      <div className="explore-search">
        <input
          type="text"
          placeholder="Search posts or users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="explore-feed">
        {filteredPosts.length === 0 ? (
          <p className="empty-state">No results found</p>
        ) : (
          <Card posts={filteredPosts} />
        )}
      </div>
    </div>
  );
};

export default Explore;
