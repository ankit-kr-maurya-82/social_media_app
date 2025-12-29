import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import dummyPosts from "../components/dummyPosts";
import "./profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);

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
              dummyPosts.cover ||
              "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"
            }
            alt="cover"
          />

          {/* Avatar */}
          <img
            src={
              dummyPosts.avatar ||
              "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"
            }
            alt="avatar"
            className="profile-avatar"
          />
        </div>

        {/* Info */}
        <div className="profile-info">
          <div className="profile-header">
            <div>
              <h2>{user.username}</h2>
              <p>@{dummyPosts.username}</p>
            </div>

            <button className="edit-profile-btn">
              Edit Profile
            </button>
          </div>

          <p className="profile-bio">
            {dummyPosts.bio || "No bio added yet."}
          </p>

          {/* Stats */}
          <div className="profile-stats">
            <span>
              <b>{dummyPosts.following || 0}</b> Following
            </span>
            <span>
              <b>{dummyPosts.followers || 0}</b> Followers
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button className="active">Posts</button>
          <button>Replies</button>
          <button>Media</button>
        </div>

        {/* Posts */}
        <div className="profile-posts">
          {dummyPosts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
