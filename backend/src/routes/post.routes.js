import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/",
  verifyJWT,
  upload.single("media"),
  createPost
);

export default router;
