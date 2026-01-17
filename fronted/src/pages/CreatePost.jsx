import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage, FaVideo } from "react-icons/fa";
import UserContext from "../context/UserContext";
import "./CSS/CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

const token = localStorage.getItem("accessToken");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("Login required");
      return;
    }

    if (!content.trim() && !imageFile && !videoFile) return;

    const formData = new FormData();
    formData.append("content", content);

    if (imageFile) formData.append("media", imageFile);
    if (videoFile) formData.append("media", videoFile);

    try {
      const res = await fetch("http://localhost:8000/api/v1/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Post failed");
      }

      navigate("/");
    } catch (err) {
      console.error("Post failed:", err.message);
    }
    
  };

  return (
    <div className="create-wrapper">
      <div className="create-box">

        <div className="create-header">
          <button onClick={() => navigate(-1)}>Cancel</button>
          <span>Create Post</span>
          <button
            className="post-btn"
            disabled={!content.trim() && !imageFile && !videoFile}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>

        <textarea
          placeholder="What do you want to share?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {imagePreview && <img src={imagePreview} className="media-preview" />}
        {videoPreview && <video src={videoPreview} className="media-preview" controls />}

        <div className="create-toolbar">
          <label>
            <FaImage />
            <input hidden type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          <label>
            <FaVideo />
            <input hidden type="file" accept="video/*" onChange={handleVideoChange} />
          </label>
        </div>

      </div>
    </div>
  );
};

export default CreatePost;
