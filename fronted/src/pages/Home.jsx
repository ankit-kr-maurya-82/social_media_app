import React from "react";
import Card from "../components/Card.jsx";
import { getFeedPosts } from "../lib/socialStore.js";

const Home = () => {
  const posts = getFeedPosts();

  return (
    <div className="ved_home_container">
      <Card posts={posts} />
    </div>
  );
};

export default Home;
