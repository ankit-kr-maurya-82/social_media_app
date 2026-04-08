import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import FollowBtn from "../components/FollowBtn";
import "./CSS/Profile.css";
import EditProfile from "../components/EditProfile";
import { fetchProfileBundle, toggleFollowProfile } from "../api/profile";
import { syncUserToStore } from "../lib/socialStore";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [editOpen, setEditOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      const bundle = await fetchProfileBundle(username);
      if (!cancelled) {
        setProfileUser(bundle.user || user || null);
        setPosts(bundle.posts || []);
        setLoading(false);
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [username, user]);

  const isOwnProfile = useMemo(
    () => user?.id && profileUser?.id && user.id === profileUser.id,
    [user, profileUser]
  );

  const handleFollowToggle = async () => {
    if (!user || !profileUser?.username || followLoading) {
      return;
    }

    setFollowLoading(true);

    const wasFollowing = Boolean(profileUser.isFollowing);
    const previousFollowers = profileUser.followers || 0;
    const optimisticProfile = syncUserToStore({
      ...profileUser,
      isFollowing: !wasFollowing,
      followers: Math.max(
        0,
        previousFollowers + (wasFollowing ? -1 : 1)
      ),
    });

    setProfileUser(optimisticProfile);

    try {
      const result = await toggleFollowProfile(profileUser.username);
      setProfileUser(result.profile);
      if (result.currentUser) {
        setUser(result.currentUser);
      }
    } catch (error) {
      setProfileUser(
        syncUserToStore({
          ...profileUser,
          isFollowing: wasFollowing,
          followers: previousFollowers,
        })
      );
      window.alert(
        error.response?.data?.message || error.message || "Unable to update follow status"
      );
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-login-warning">Loading profile...</div>;
  }

  if (!profileUser) {
    return <div className="profile-login-warning">User profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <section className="profile-hero-card">
          <div className="profile-hero-topline">
            <span className="profile-kicker">Writer profile</span>
            <span className="profile-issue-note">Personal essays, notes, and published articles</span>
          </div>

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

              {isOwnProfile && (
                <button
                  className="avatar-overlay edit-profile-btn"
                  onClick={() => setEditOpen(true)}
                >
                  Edit Profile
                </button>
              )}

              {editOpen && <EditProfile onClose={() => setEditOpen(false)} />}
            </div>

            <div className="profile-info">
              <div className="profile-heading-row">
                <div>
                  <h1 className="fullName">
                    {profileUser.fullName || profileUser.username}
                  </h1>
                  <p className="profile-username">@{profileUser.username}</p>
                </div>

                {!isOwnProfile && user && (
                  <FollowBtn
                    isFollowing={Boolean(profileUser.isFollowing)}
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                  />
                )}
              </div>

              <p className="profile-bio">
                {profileUser.bio || "No bio added yet."}
              </p>

              <div className="profile-stats">
                <article>
                  <b>{profileUser.followers || 0}</b>
                  <span>Followers</span>
                </article>
                <article>
                  <b>{profileUser.following || 0}</b>
                  <span>Following</span>
                </article>
                <article>
                  <b>{posts.length}</b>
                  <span>Articles</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <div className="profile-tabs">
          {["posts", "replies", "media"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "posts" ? "Articles" : tab.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTab === "posts" && (
          <section className="profile-posts">
            <div className="profile-section-head">
              <div>
                <span className="profile-kicker">Published work</span>
                <h2>Articles by {profileUser.fullName || profileUser.username}</h2>
              </div>
              <p>
                A curated archive of essays, observations, and ideas from this
                profile.
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="profile-empty-card">
                <h3>No articles yet</h3>
                <p>This writer has not published anything yet.</p>
              </div>
            ) : (
              <Card posts={posts} />
            )}
          </section>
        )}

        {activeTab !== "posts" && (
          <div className="empty-state">Coming soon</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
