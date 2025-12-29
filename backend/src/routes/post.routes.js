import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  toggleLikePost,
} from "../controllers/post.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * 🔓 Public Routes
 */
router.get("/", getAllPosts);
router.get("/:postId", getPostById);

/**
 * 🔐 Protected Routes
 */
router.post("/", verifyJWT, createPost);
router.delete("/:postId", verifyJWT, deletePost);
router.post("/:postId/like", verifyJWT, toggleLikePost);

export default router;
