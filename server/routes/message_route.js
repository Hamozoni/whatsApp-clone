
import { Router } from "express";
import { post_message_controller } from "../controllers/message_controller.js";

const router = Router();

router.post('/message',post_message_controller);

export default router;