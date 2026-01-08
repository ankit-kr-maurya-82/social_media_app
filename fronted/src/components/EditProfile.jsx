import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import "./CSS/EditProfile.css";

const EditProfile = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);

  const [fullName, setFullName] = useState(user.fullName || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      fullName,
      username,
      bio,
      avatar,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    onClose();
  };

  return (
    <div className="edit-profile-overlay" onClick={onClose}>
      <div
        className="edit-profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Profile</h2>

        {/* Avatar */}
        <div className="edit-avatar">
          {avatar ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <div className="avatar-fallback">
              {username.charAt(0).toUpperCase()}
            </div>
          )}

          <label>
            Change
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Inputs */}
        <div className="edit-fields">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <textarea
            placeholder="Bio"
            maxLength={160}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="edit-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
