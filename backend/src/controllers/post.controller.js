import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create post
const createPost = asyncHandler(async(req,res)=> {
  const {title, content, images} = req.body;

  if(!title || !content){
    throw new ApiError(400,"title and content are required");
  }

  const post = await Post.create({
    title,
    content,
    images: images || [],
    owner: req.user._id,
    isPublished: true,
  });

  return res.status(201).json(new ApiResponse(201,post, "Post created successfully"))
});

// get all posts

const getAllPosts = asyncHandler(async (req, res)=> {
  const posts = await Post.find({isPublished: true}).populate("owner", "username fullName avatar").sort({createdAt: -1});

    return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
}) 

const getPostById = asyncHandler(async(req,res)=> {
  const {postId} = req.params;

  const post = await Post.findById(postId).populate("owner", "username fullName avatar");

  if(!post){
    throw new ApiError(404, "Post not found");
  }

  post.views += 1;
  await post.save();

  return res.status(200).json(new ApiResponse(200, post, "Post fetched successfully"))
});


// delete post

const deletePost = asyncHandler(async(req,res)=>{
  const {postId} = req.params;
  const post = await Post.findById(postId)

    if (!post) throw new ApiError(404, "Post not found");

    if(post.owner.toString() !== req.user._id.toString()){
      throw new ApiError(403, "You are not allowed to delete this post")
    }

    await post.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
})


// like / unlike Post / togglelike post

const toggleLikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) throw new ApiError(404, "Post not found");

  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      { likesCount: post.likes.length, liked: !isLiked },
      isLiked ? "Post unliked" : "Post liked"
    )
  );
});




export {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  toggleLikePost
};
