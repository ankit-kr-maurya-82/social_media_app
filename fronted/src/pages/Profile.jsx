import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import dummyPosts from "../components/dummyPosts";
import "./CSS/Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("posts");

  if (!user) {
    return (
      <div className="profile-login-warning">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Avatar + Info */}
        <div className="profile-top">
          <div className="avatar-wrapper">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar fallback-avatar">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="avatar-overlay">Edit</div>
          </div>

          <div className="profile-info">
            <h2>{user.fullName || user.username}</h2>
            <p>@{user.username}</p>

            <p className="profile-bio">
              {user.bio || "No bio added yet."}
            </p>

            <div className="profile-stats">
              <button
                className={activeTab === "followers" ? "active" : ""}
                onClick={() => setActiveTab("followers")}
              >
                <b>{user.followers?.length || 0}</b>
                <span>Followers</span>
              </button>

              <button
                className={activeTab === "following" ? "active" : ""}
                onClick={() => setActiveTab("following")}
              >
                <b>{user.following?.length || 0}</b>
                <span>Following</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={activeTab === "replies" ? "active" : ""}
            onClick={() => setActiveTab("replies")}
          >
            Replies
          </button>
          <button
            className={activeTab === "media" ? "active" : ""}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
        </div>

        {/* Content */}
        {activeTab === "posts" && (
          <div className="profile-posts">
            {dummyPosts.length === 0 ? (
              <p className="no-posts">No posts yet</p>
            ) : (
              dummyPosts.map((post) => (
                <Card key={post._id || post.id} post={post} />
              ))
            )}
          </div>
        )}

        {activeTab !== "posts" && (
          <div className="empty-state">Coming soon</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
