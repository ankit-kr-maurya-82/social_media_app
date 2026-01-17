import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage, FaVideo } from "react-icons/fa";
import "./CSS/CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setVideo(null);
  };

  const handleVideoChange = (e) => {
    setVideo(URL.createObjectURL(e.target.files[0]));
    setImage(null);
  };

  const handleSubmit = () => {
    if (!content.trim() && !image && !video) return;
    navigate("/");
  };

  return (
    <div className="create-wrapper">
      <div className="create-box">

        {/* Header */}
        <div className="create-header">
          <button onClick={() => navigate(-1)}>Cancel</button>
          <span>Create Post</span>
          <button
            className="post-btn"
            disabled={!content.trim() && !image && !video}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>

        {/* Text */}
        <textarea
          placeholder="What do you want to share?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Media */}
        {image && <img src={image} className="media-preview" />}
        {video && <video src={video} className="media-preview" controls />}

        {/* Bottom Actions */}
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
