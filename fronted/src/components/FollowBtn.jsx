import React, { useState } from 'react';
import "./CSS/FollowBtn.css"

const FollowBtn = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <button
          className={isFollowing ? 'following' : 'follow'}
      onClick={handleFollow}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowBtn;