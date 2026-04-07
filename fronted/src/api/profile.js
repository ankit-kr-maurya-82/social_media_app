import api from "./axios";
import {
  getPostsByUsername as getLocalPostsByUsername,
  getUserByUsername as getLocalUserByUsername,
  syncUserToStore,
} from "../lib/socialStore";

export const fetchProfileBundle = async (username) => {
  const normalized = username?.trim();
  if (!normalized) {
    return { user: null, posts: [] };
  }

  try {
    const [profileResponse, postsResponse] = await Promise.all([
      api.get(`/users/profile/${normalized}`),
      api.get(`/posts/user/${normalized}`),
    ]);

    const nextUser = syncUserToStore(profileResponse.data?.data);
    return {
      user: nextUser,
      posts: postsResponse.data?.posts || [],
    };
  } catch {
    return {
      user: getLocalUserByUsername(normalized),
      posts: getLocalPostsByUsername(normalized),
    };
  }
};
