import { Router } from "express";
import { get_channel, post_channel } from "../controllers/channel.controller.js";
import upload from "../middleware/upload_middleware.js";

const router = Router();

router.route('/')
.post(upload.single('file'),post_channel)
.get(get_channel)

export default router;