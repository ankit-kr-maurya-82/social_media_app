import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import "./post.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // TEMP dummy data (API later)
        setPosts([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed-page">
      <div className="feed-container">

        {/* Feed */}
        <div className="feed-posts">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : posts.length === 0 ? (
            <p className="feed-empty">No posts yet</p>
          ) : (
            posts.map((post) => (
              <Card key={post._id || post.id} post={post} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Post;
