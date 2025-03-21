
import { Router } from "express";
import { get_message_controller, post_message_controller } from "../controllers/message_controller.js";

const router = Router();

router.post('/message',post_message_controller);
router.get('/message',get_message_controller);

export default router;