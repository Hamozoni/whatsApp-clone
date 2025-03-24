import { Router } from "express";
import { post_notification,get_notification,put_notification } from "../controllers/notification.controller.js";

const router = Router();

router.route('/')
.post(post_notification)
.put(put_notification)
.get(get_notification)

export default router;