
import { Router } from "express";
import upload from "../middleware/upload_middleware.js";
import { get_message_controller, post_message_controller, put_message_status_controller } from "../controllers/message.controller.js";

const router = Router();

router.route('/')
.post(upload.single('file'),post_message_controller)
.get(get_message_controller)
.put(put_message_status_controller)


export default router;