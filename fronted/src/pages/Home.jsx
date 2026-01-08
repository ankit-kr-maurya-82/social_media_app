import React, { act, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./CSS/Home.css";
import dummyPosts from "./dummyPosts.js";
import {
  FaArrowDown,
  FaArrowUp,
  FaHeart,
  FaRegComment,
  FaRegCommentDots,
  FaRegHeart,
  FaShare,
  FaTimes,
} from "react-icons/fa";
import Card from "../components/Card.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dummyPosts);

  const [activeMedia, setActiveMedia] = useState(null); // image or video

  const handleVote = (id, vote) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id !== id) return post;

        const newVote = post.userVote === vote ? 0 : vote;
        const diff = newVote - post.userVote;

        return {
          ...post,
          // userVote: newVote,
          userVote: post.userVote + diff,
        };
      })
    );
  };

  return (
    <Card/>
  );
};

export default Home;
