import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Card from "../components/Card";
import dummyPosts from "../components/dummyPosts";

const Profile = () => {
  // const { user } = useContext(UserContext);
  // const { user } = useContext(UserContext);

  // if (!user) {
  //   return (
  //     <div className="h-screen flex items-center justify-center text-gray-500">
  //       Please login to view profile
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-xl mx-auto">
      {/* Cover */}
      <div className="h-32 bg-gray-300 relative">
        <img
          src={dummyPosts.cover || "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"}
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Avatar */}
        <img
          src={dummyPosts.avatar || "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg"}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4 object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold">{dummyPosts.name || "User Name"}</h2>
            <p className="text-sm text-gray-500">@{dummyPosts.username}</p>
          </div>

          <button className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100">
            Edit Profile
          </button>
        </div>

        <p className="text-sm mt-2">
          {dummyPosts.bio || "No bio added yet."}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mt-3 text-sm">
          <span>
            <b>{dummyPosts.following || 0}</b> Following
          </span>
          <span>
            <b>{dummyPosts.followers || 0}</b> Followers
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b mt-4 text-sm font-medium">
        <button className="py-3 border-b-2 border-blue-500 text-blue-500">
          Posts
        </button>
        <button className="py-3 text-gray-500 hover:text-black">
          Replies
        </button>
        <button className="py-3 text-gray-500 hover:text-black">
          Media
        </button>
      </div>

      {/* Posts (UI only) */}
      <div>
        {dummyPosts.map((post) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
