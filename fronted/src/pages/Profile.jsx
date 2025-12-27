import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import dummyPosts from "../components/dummyPosts";

const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 bg-slate-950">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-xl mx-auto border-x border-slate-800">

        {/* Cover */}
        <div className="relative h-40 bg-slate-700">
          <img
            src={
              dummyPosts.cover ||
              "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"
            }
            alt="cover"
            className="w-full h-full object-cover"
          />

          {/* Avatar */}
          <img
            src={
              dummyPosts.avatar ||
              "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"
            }
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-slate-950 absolute -bottom-14 left-4 object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-sm text-slate-400">@{dummyPosts.username}</p>
            </div>

            <button className="border border-slate-600 px-4 py-1.5 rounded-full text-sm hover:bg-slate-800 transition">
              Edit Profile
            </button>
          </div>

          <p className="text-sm text-slate-300 mt-3">
            {dummyPosts.bio || "No bio added yet."}
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-4 text-sm text-slate-300">
            <span>
              <b className="text-white">{dummyPosts.following || 0}</b>{" "}
              Following
            </span>
            <span>
              <b className="text-white">{dummyPosts.followers || 0}</b>{" "}
              Followers
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mt-6 border-b border-slate-800 text-sm font-medium">
          <button className="py-3 border-b-2 border-blue-500 text-blue-500 w-full">
            Posts
          </button>
          <button className="py-3 text-slate-400 hover:text-white w-full">
            Replies
          </button>
          <button className="py-3 text-slate-400 hover:text-white w-full">
            Media
          </button>
        </div>

        {/* Posts */}
        <div>
          {dummyPosts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
