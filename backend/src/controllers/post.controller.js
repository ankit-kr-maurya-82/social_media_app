import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";


export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;


  if (!content && !req.file) {
    throw new ApiError(400, "Post cannot be empty");
  }

  const post = await Post.create({
    content,
    media: req.file?.path || null,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    post,
  });
});
