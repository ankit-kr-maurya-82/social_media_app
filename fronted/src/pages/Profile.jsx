import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import "./CSS/Profile.css";
import EditProfile from "../components/EditProfile";
import { getPostsByUsername, getUserByUsername } from "../lib/socialStore";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [editOpen, setEditOpen] = useState(false);

  const profileUser = useMemo(
    () => getUserByUsername(username) || user,
    [username, user]
  );
  const posts = useMemo(
    () => (profileUser ? getPostsByUsername(profileUser.username) : []),
    [profileUser]
  );

  if (!profileUser) {
    return <div className="profile-login-warning">User profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-top">
          <div className="avatar-wrapper">
            {profileUser.avatar ? (
              <img
                src={profileUser.avatar}
                alt="avatar"
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar fallback-avatar">
                {profileUser.username?.charAt(0).toUpperCase()}
              </div>
            )}

            {user?.id === profileUser.id && (
              <button
                className="avatar-overlay edit-profile-btn"
                onClick={() => setEditOpen(true)}
              >
                Edit
              </button>
            )}

            {editOpen && <EditProfile onClose={() => setEditOpen(false)} />}
          </div>

          <div className="profile-info">
            <h2 className="fullName">
              {profileUser.fullName || profileUser.username}
            </h2>
            <p className="username">@{profileUser.username}</p>

            <p className="profile-bio">
              {profileUser.bio || "No bio added yet."}
            </p>

            <div className="profile-stats">
              <button>
                <b>{profileUser.followers || 0}</b>
                <span>Followers</span>
              </button>
              <button>
                <b>{profileUser.following || 0}</b>
                <span>Following</span>
              </button>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          {["posts", "replies", "media"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTab === "posts" && (
          <div className="profile-posts">
            {posts.length === 0 ? (
              <p className="no-posts">No posts yet</p>
            ) : (
              <Card posts={posts} />
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
