import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    // 🔥 backend later
    console.log({
      content,
      image,
      video,
    });

    navigate("/");
  };

  return (
    <div className="create-post-page">
      <div className="create-post-card">

        <h2>Create Post</h2>

        {/* Text */}
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Preview */}
        {image && (
          <div className="preview">
            <img src={image} alt="preview" />
          </div>
        )}

        {video && (
          <div className="preview">
            <video src={video} controls />
          </div>
        )}

        {/* Actions */}
        <div className="create-actions">
          <label>
            📷 Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>

          <label>
            🎥 Video
            <input type="file" accept="video/*" hidden onChange={handleVideoChange} />
          </label>

          <button onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
