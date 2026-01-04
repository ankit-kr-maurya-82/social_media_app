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

        {/* Cover */}
        <div className="profile-cover">
          <img
            src={
              user.coverImage ||
              "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"
            }
            alt="cover"
          />

          {/* Avatar */}
          <div className="avatar-wrapper">
            <img
              src={
                user.avatar ||
                "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"
              }
              alt="avatar"
              className="profile-avatar"
            />
            <div className="avatar-overlay">Edit</div>
          </div>
        </div>

        {/* Info */}
        <div className="profile-info">
          <div className="profile-header">
            <div>
              <h2>{user.fullName || user.username}</h2>
              <p>@{user.username}</p>
            </div>

            <button className="edit-profile-btn">
              Edit Profile
            </button>
          </div>

          <p className="profile-bio">
            {user.bio || "No bio added yet."}
          </p>

          {/* Stats */}
          <div className="profile-stats">
            <span>
              <b>{user.following?.length || 0}</b> Following
            </span>
            <span>
              <b>{user.followers?.length || 0}</b> Followers
            </span>
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

        {/* Posts */}
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
      </div>
    </div>
  );
};

export default Profile;
