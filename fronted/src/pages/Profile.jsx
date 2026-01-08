import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import dummyPosts from "../components/dummyPosts";
import "./CSS/Profile.css";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [editOpen, setEditOpen] = useState(false);

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

        {/* Top */}
        <div className="profile-top">
          <div className="avatar-wrapper">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="profile-avatar" />
            ) : (
              <div className="profile-avatar fallback-avatar">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <button 
            className="avatar-overlay edit-profile-btn"
            onClick={()=> setEditOpen(true)}>
              Edit</button>
              {editOpen && <EditProfile onClose={() => setEditOpen(false)} />}

          </div>

          <div className="profile-info">
            <h2 className="fullName">{user.fullName || user.username}</h2>
            <p className="username">@{user.username}</p>

            <p className="profile-bio">
              {user.bio || "No bio added yet."}
            </p>

            <div className="profile-stats">
              <button>
                <b>{user.followers?.length || 0}</b>
                <span>Followers</span>
              </button>
              <button>
                <b>{user.following?.length || 0}</b>
                <span>Following</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Content */}
        {activeTab === "posts" && (
          <div className="profile-posts">
            {dummyPosts.length === 0 ? (
              <p className="no-posts">No posts yet</p>
            ) : (
              dummyPosts.map((post) => (
                <Card key={post._id} post={post} />
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
