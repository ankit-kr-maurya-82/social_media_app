const STORAGE_KEYS = {
  users: "social_users",
  posts: "social_posts",
  comments: "social_comments",
  currentUser: "user",
  accessToken: "accessToken",
};

const seedUsers = [
  {
    id: "user_ankit",
    fullName: "Ankit Kumar",
    username: "ankit_kumar",
    email: "ankit@example.com",
    password: "123456",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    bio: "Full-stack builder sharing practical ideas for creators and developers.",
    followers: 182,
    following: 91,
  },
  {
    id: "user_rahul",
    fullName: "Rahul Shetty",
    username: "rahul_shetty",
    email: "rahul@example.com",
    password: "123456",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    bio: "Learning in public and writing about software, systems, and momentum.",
    followers: 98,
    following: 64,
  },
];

const seedPosts = [
  {
    id: "post_launch",
    title: "How I Built a Creator Feed That Actually Feels Alive",
    content:
      "The best social products feel personal before they feel massive. I focused on small loops: posting quickly, seeing replies instantly, and keeping the feed useful even without a huge network.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
    tags: ["react", "design", "product"],
    authorId: "user_ankit",
    createdAt: "2026-04-06T09:30:00.000Z",
    likesCount: 42,
  },
  {
    id: "post_remote",
    title: "Three Habits That Improved My Remote Dev Workflow",
    content:
      "I stopped chasing perfect routines and built a simple system: one deep-work block, one public update, and one cleanup pass before logging off. It made consistency much easier.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    },
    tags: ["workflow", "career", "productivity"],
    authorId: "user_rahul",
    createdAt: "2026-04-05T14:10:00.000Z",
    likesCount: 27,
  },
];

const seedComments = {
  post_launch: [
    {
      id: "comment_1",
      text: "This is the kind of product thinking more apps need.",
      userName: "Rahul Shetty",
      createdAt: "2026-04-06T10:00:00.000Z",
    },
  ],
  post_remote: [
    {
      id: "comment_2",
      text: "That cleanup pass idea is underrated.",
      userName: "Ankit Kumar",
      createdAt: "2026-04-05T15:00:00.000Z",
    },
  ],
};

const safeRead = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const safeWrite = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const ensureSeed = () => {
  const users = safeRead(STORAGE_KEYS.users, null);
  const posts = safeRead(STORAGE_KEYS.posts, null);
  const comments = safeRead(STORAGE_KEYS.comments, null);

  if (!users) safeWrite(STORAGE_KEYS.users, seedUsers);
  if (!posts) safeWrite(STORAGE_KEYS.posts, seedPosts);
  if (!comments) safeWrite(STORAGE_KEYS.comments, seedComments);
};

const getUsers = () => {
  ensureSeed();
  return safeRead(STORAGE_KEYS.users, seedUsers);
};

const saveUsers = (users) => safeWrite(STORAGE_KEYS.users, users);

const getPosts = () => {
  ensureSeed();
  return safeRead(STORAGE_KEYS.posts, seedPosts);
};

const savePosts = (posts) => safeWrite(STORAGE_KEYS.posts, posts);

const getCommentsMap = () => {
  ensureSeed();
  return safeRead(STORAGE_KEYS.comments, seedComments);
};

const saveCommentsMap = (comments) => safeWrite(STORAGE_KEYS.comments, comments);

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

const toPostViewModel = (post, users = getUsers()) => {
  const author = users.find((item) => item.id === post.authorId);
  return {
    ...post,
    _id: post.id,
    username: author?.username || "unknown_user",
    avatar: author?.avatar || "",
    fullName: author?.fullName || "Unknown User",
    bio: author?.bio || "",
    commentsCount: getComments(post.id).length,
  };
};

export const getFeedPosts = () =>
  getPosts()
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => toPostViewModel(post));

export const getPostById = (postId) => {
  const post = getPosts().find((item) => item.id === postId);
  return post ? toPostViewModel(post) : null;
};

export const getPostsByUsername = (username) =>
  getFeedPosts().filter((post) => post.username === username);

export const searchPosts = (query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getFeedPosts();

  return getFeedPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(normalized) ||
      post.content.toLowerCase().includes(normalized) ||
      post.username.toLowerCase().includes(normalized) ||
      post.fullName.toLowerCase().includes(normalized) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(normalized))
  );
};

export const getUserByUsername = (username) =>
  getUsers().find((user) => user.username === username) || null;

export const syncUserToStore = (user) => {
  if (!user?.id && !user?._id) return user;

  const normalizedUser = {
    followers: 0,
    following: 0,
    bio: "",
    avatar: "",
    ...user,
    id: user.id || user._id,
  };

  const users = getUsers();
  const exists = users.some((item) => item.id === normalizedUser.id);
  const nextUsers = exists
    ? users.map((item) =>
        item.id === normalizedUser.id ? { ...item, ...normalizedUser } : item
      )
    : [...users, normalizedUser];

  saveUsers(nextUsers);
  return normalizedUser;
};

export const registerLocalUser = ({ fullName, username, email, password }) => {
  const users = getUsers();
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const alreadyExists = users.some(
    (user) =>
      user.username === normalizedUsername || user.email === normalizedEmail
  );

  if (alreadyExists) {
    throw new Error("User with email or username already exists");
  }

  const user = {
    id: `user_${Date.now()}`,
    fullName: fullName.trim(),
    username: normalizedUsername,
    email: normalizedEmail,
    password,
    avatar: "",
    bio: "Tell people what you are building.",
    followers: 0,
    following: 0,
  };

  saveUsers([...users, user]);
  return sanitizeUser(user);
};

export const loginLocalUser = ({ email, password }) => {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (item) => item.email === normalizedEmail && item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const safeUser = sanitizeUser(user);
  window.localStorage.setItem(STORAGE_KEYS.accessToken, `demo-token-${user.id}`);
  window.localStorage.setItem(
    STORAGE_KEYS.currentUser,
    JSON.stringify(safeUser)
  );
  return safeUser;
};

export const logoutLocalUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.localStorage.removeItem(STORAGE_KEYS.accessToken);
};

export const getCurrentUser = () => safeRead(STORAGE_KEYS.currentUser, null);

export const updateLocalUserProfile = (updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const users = getUsers();
  const hasCurrentUser = users.some((user) => user.id === currentUser.id);
  const baseUsers = hasCurrentUser ? users : [...users, currentUser];
  const nextUsers = baseUsers.map((user) =>
    user.id === currentUser.id ? { ...user, ...updates } : user
  );
  saveUsers(nextUsers);

  const nextCurrentUser = sanitizeUser(
    nextUsers.find((user) => user.id === currentUser.id)
  );
  window.localStorage.setItem(
    STORAGE_KEYS.currentUser,
    JSON.stringify(nextCurrentUser)
  );
  return nextCurrentUser;
};

export const createLocalPost = ({ title, content, media }) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error("Login required");
  }

  const post = {
    id: `post_${Date.now()}`,
    title: title?.trim() || "Untitled Post",
    content: content.trim(),
    media: media || null,
    tags: [],
    authorId: currentUser.id,
    createdAt: new Date().toISOString(),
    likesCount: 0,
  };

  savePosts([post, ...getPosts()]);
  return toPostViewModel(post);
};

export const getComments = (postId) => {
  const commentMap = getCommentsMap();
  return commentMap[postId] || [];
};

export const addComment = (postId, text) => {
  const currentUser = getCurrentUser();
  const nextComment = {
    id: `comment_${Date.now()}`,
    text,
    userName: currentUser?.fullName || currentUser?.username || "Guest",
    createdAt: new Date().toISOString(),
  };

  const commentMap = getCommentsMap();
  const nextMap = {
    ...commentMap,
    [postId]: [nextComment, ...(commentMap[postId] || [])],
  };
  saveCommentsMap(nextMap);
  return nextMap[postId];
};
