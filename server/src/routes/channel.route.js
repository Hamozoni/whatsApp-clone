import { Router } from "express";
import { get_channel, post_channel } from "../controllers/channel.controller.js";
import upload_middleware from "../middleware/upload.middleware.js";

const router = Router();

router.route('/')
.post(upload_middleware.single('file'),post_channel)
.get(get_channel)

export default router;