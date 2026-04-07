import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaImage, FaVideo } from "react-icons/fa";
import "./CSS/CreatePost.css";
import {
  createLocalPost,
  getCurrentUser,
  getPostById,
  updateLocalPost,
} from "../lib/socialStore";

const CreatePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditMode = Boolean(postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!isEditMode) return;

    const post = getPostById(postId);
    if (!post) {
      setError("Article not found");
      return;
    }

    if (currentUser?.id !== post.authorId) {
      setError("You can edit only your own article");
      return;
    }

    setTitle(post.title || "");
    setContent(post.content || "");
    if (post.media?.type === "image") setImagePreview(post.media.url);
    if (post.media?.type === "video") setVideoPreview(post.media.url);
  }, [currentUser?.id, isEditMode, postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setVideoFile(null);
    setVideoPreview(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    setError("");

    if (!currentUser) {
      setError("Login required");
      return;
    }

    if (!content.trim() && !imageFile && !videoFile) return;

    const mediaPayload = imagePreview
      ? { type: "image", url: imagePreview }
      : videoPreview
        ? { type: "video", url: videoPreview }
        : null;

    if (isEditMode) {
      try {
        updateLocalPost(postId, {
          title,
          content,
          media: mediaPayload,
        });
        navigate(`/post/${postId}`);
      } catch (updateError) {
        setError(updateError.message || "Unable to update article.");
      }
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) formData.append("media", imageFile);
    if (videoFile) formData.append("media", videoFile);

    try {
      let res = null;
      if (token) {
        res = await fetch("http://localhost:8000/api/v1/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      if (res && !res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Post failed");
      }

      createLocalPost({
        title,
        content,
        media: mediaPayload,
      });
      navigate("/home");
    } catch (requestError) {
      try {
        createLocalPost({
          title,
          content,
          media: mediaPayload,
        });
        navigate("/home");
      } catch (localError) {
        setError(
          localError.message ||
            requestError.message ||
            "Unable to create post right now."
        );
      }
    }
  };

  return (
    <div className="create-wrapper">
      <div className="create-box">
        <div className="create-header">
          <button onClick={() => navigate(-1)}>Cancel</button>
          <span>{isEditMode ? "Edit Article" : "Create Post"}</span>
          <button
            className="post-btn"
            disabled={!content.trim() && !imageFile && !videoFile}
            onClick={handleSubmit}
          >
            {isEditMode ? "Update" : "Post"}
          </button>
        </div>

        <textarea
          placeholder="Give your post a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="What do you want to share?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {error && <p className="error-msg">{error}</p>}

        {imagePreview && <img src={imagePreview} className="media-preview" />}
        {videoPreview && (
          <video src={videoPreview} className="media-preview" controls />
        )}

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
