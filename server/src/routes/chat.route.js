import { Router } from "express";
import { get_chat_unread_messages, post_chat_controller } from "../controllers/chat.controller.js";


const router = Router();

router.route('/')
.post(post_chat_controller)
.get(get_chat_unread_messages)

export default router;