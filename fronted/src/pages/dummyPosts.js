const dummyPosts = [
  {
    _id: 1,
    fullName: {
      firstName: "Ankit",
      lastName: "Kumar"
    },
    username: "ankit_dev",
    content: "idk i was bored",
    image: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg",
    likesCount: 12,
    isLiked: false,
        userVote: 0, // 🔥 -1 = downvote | 0 = none | 1 = upvote

  },
  {
    _id: 2,
    fullName: {
      firstName: "Rahul",
      lastName: "Shetty"
    },
    username: "rahul_shetty",
    content: "Lorem ipsum, dolota?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores quos, voluptates nisi similique praesentium impedit rem natus enim assumenda numquam iusto magnam quis cum obcaecati ",
    image: "",
    likesCount: 5,
    isLiked: true,    userVote: 0, // 🔥 -1 = downvote | 0 = none | 1 = upvote

  },
  {
    _id: 4,
    fullName: {
      firstName: "Rohit",
      lastName: "Sharma"
    },
    username: "rohit_sharma",
    content: "idk i was bored",
    image: "https://images.pexels.com/photos/10948946/pexels-photo-10948946.jpeg",
    likesCount: 12,
    isLiked: false,
        userVote: 0, // 🔥 -1 = downvote | 0 = none | 1 = upvote

  },
  {
    _id: 5,
    fullName: {
      firstName: "Uttaran",
      lastName: "Bose"
    },
    username: "uttaran_shaan",
    content: "idk i was bored",
    image: "https://images.pexels.com/photos/35243235/pexels-photo-35243235.jpeg",
    likesCount: 12,
    isLiked: false,
        userVote: 0, // 🔥 -1 = downvote | 0 = none | 1 = upvote

  },
  {
    _id: 6,
    fullName: {
      firstName: "kavita",
      lastName: "Rawat"
    },
    username: "kavita_03",
    content: "idk i was bored",
    video: "https://www.pexels.com/download/video/2835528/",
    likesCount: 12,
    isLiked: false,
    userVote: 0, // 🔥 -1 = downvote | 0 = none | 1 = upvote

  },
];

export default dummyPosts;
