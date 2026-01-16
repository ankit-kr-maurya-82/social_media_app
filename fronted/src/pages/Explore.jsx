import React, { useState } from "react";
import "./CSS/Explore.css";
import dummyPosts from "../components/dummyPosts";
import Card from "../components/Card";

const Explore = () => {
  const [query, setQuery] = useState("");

  const filteredPosts = dummyPosts.filter(
    (post) =>
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="explore-page">
      {/* Search */}
      <div className="explore-search">
        <input
          type="text"
          placeholder="Search posts or users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Feed */}
      <div className="explore-feed">
        {filteredPosts.length === 0 ? (
          <p className="empty-state">No results found</p>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
