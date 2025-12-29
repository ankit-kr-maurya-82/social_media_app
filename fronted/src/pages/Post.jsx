import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Box from "../components/Box";
// import { fetchPosts } from "../../api/post.api.js";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data.data); // ApiResponse.data
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading posts...</p>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <Box />

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No posts available
        </p>
      ) : (
        posts.map((post) => (
          <Card key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default Post;
