import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CSS/PostPage.css";
import { FaArrowLeft, FaClock, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import Comments from "../components/Comments/Comments.jsx";
import { getCurrentUser } from "../lib/socialStore.js";
import { deletePostApi, fetchPostById } from "../api/post.js";
import { formatArticleDate } from "../utils/formatArticleDate.js";

const PostPage = () => {
  const { postId } = useParams();
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      setLoading(true);
      try {
        const post = await fetchPostById(postId);
        if (!cancelled) {
          setActivePost(post);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setActivePost(null);
          setLoading(false);
        }
      }
    };

    loadPost();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (loading) {
    return <div className="article-page">Loading article...</div>;
  }

  if (!activePost) {
    return <div className="article-page">Post not found.</div>;
  }

  const estimatedReadTime =
    activePost.readTime ||
    `${Math.max(3, Math.ceil((activePost.content?.length || 0) / 180))} min read`;
  const publishedAt = formatArticleDate(activePost.createdAt || activePost.updatedAt);
  const isOwner = currentUser?.id === activePost.authorId;

  return (
    <div className="article-page">
      <div className="article-page-topbar">
        <Link to="/home" className="article-nav-link">
          <FaArrowLeft /> Back to feed
        </Link>
        <Link to="/create" className="create-post-btn">
          <FaPlus /> Write article
        </Link>
      </div>

      <div className="article-layout">
        <article className="article-main">
          <div className="article-meta-strip">
            <span className="article-kicker">Featured article</span>
            <span className="article-read-time">
              <FaClock /> {estimatedReadTime}
            </span>
          </div>

          <h1 className="article-title">{activePost.title}</h1>

          <Link to={`/profile/${activePost.username}`} className="post-author article-author-row">
            {activePost.avatar ? (
              <img src={activePost.avatar} alt="avatar" className="post-avatar" />
            ) : (
              <div className="avatar-fallback">{activePost.fullName.charAt(0)}</div>
            )}

            <div className="article-author-copy">
              <strong>{activePost.fullName}</strong>
              <span>@{activePost.username}</span>
            </div>
          </Link>

          <div className="article-publish-meta" aria-label={publishedAt.full}>
            <span className="article-publish-day">{publishedAt.day}</span>
            <span>{publishedAt.date}</span>
            {publishedAt.time && <span>{publishedAt.time}</span>}
          </div>

          {activePost.media && (
            <div className="article-media-frame">
              {activePost.media.type === "image" ? (
                <img
                  src={activePost.media.url}
                  alt="post"
                  className="article-media"
                />
              ) : (
                <video
                  src={activePost.media.url}
                  controls
                  className="article-media"
                />
              )}
            </div>
          )}

          <div className="article-body">
            <p>{activePost.content}</p>
          </div>

          {isOwner && (
            <div className="article-owner-actions">
              <Link to={`/edit/${activePost.id || activePost._id}`} className="owner-action-btn">
                <FaPen /> Edit article
              </Link>
              <button
                className="owner-action-btn danger"
                onClick={async () => {
                  try {
                    await deletePostApi(activePost.id || activePost._id);
                    window.location.href = "/home";
                  } catch {
                    window.alert("Database delete failed. Check backend/MongoDB.");
                  }
                }}
              >
                <FaTrash /> Delete article
              </button>
            </div>
          )}
        </article>

        <aside className="comments-panel">
          <div className="comments-header">
            <span className="comments-kicker">Discussion</span>
            <h2>Reader notes</h2>
            <p>Responses, reactions, and follow-up thoughts on this article.</p>
          </div>
          <Comments postId={activePost.id || activePost._id} />
        </aside>
      </div>
    </div>
  );
};

export default PostPage;
