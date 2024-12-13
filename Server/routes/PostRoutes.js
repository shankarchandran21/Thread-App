import express from 'express';
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post("/create",protectRoute,createPost)
router.delete("/:id",protectRoute,deletePost)
router.post("/like/:id",protectRoute,likeUnlikePost)
router.post("/reply/:id",protectRoute,replyToPost)
router.get("/feed",protectRoute,getFeedPosts)
router.get("/:id",getPost)

export default router