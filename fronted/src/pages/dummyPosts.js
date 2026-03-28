const dummyPosts = [
{
  _id: "1",
  title: "Beautiful Sunset View",
  content: "Captured this amazing sunset during my evening walk. The colors were absolutely stunning!",
  username: "ankit",
  fullName: { firstName: "Ankit", lastName: "Maurya" },
  avatar: "",
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  },
  votes: 42,
  comments: 8,
  userVote: 0
},
{
  _id: "2",
  title: "Mountain Hiking Adventure",
  content: "Just completed an amazing hike up the mountains. The view from the top was breathtaking!",
  username: "john_doe",
  fullName: { firstName: "John", lastName: "Doe" },
  avatar: "",
  media: {
    type: "image",
    url: "https://images.unsplash.com/photo-1464822759844-d150f38f109b"
  },
  votes: 28,
  comments: 5,
  userVote: 0
}
];

export default dummyPosts;
