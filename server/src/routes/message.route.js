
import { Router } from "express";
import multer from 'multer'
import { get_message_controller, post_message_controller, put_message_status_controller } from "../controllers/message.controller.js";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  });

router.route('/')
.post(upload.single('file'),post_message_controller)
.get(get_message_controller)
.put(put_message_status_controller)


export default router;