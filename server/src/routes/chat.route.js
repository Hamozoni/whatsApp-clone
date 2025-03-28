import { Router } from "express";
import { post_chat_controller } from "../controllers/chat.controller.js";


const router = Router();

router.route('/')
.post(post_chat_controller);

export default router;