
import { Router } from "express";
import { get_message_controller, post_message_controller } from "../controllers/message.controller.js";

const router = Router();

router.route('/')
.post(post_message_controller)
.get(get_message_controller);


export default router;