import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import getAllChatsRoute from "./chat.route.js";
import call_route from "./call.route.js";
import getAllStatusRoute from './status.route.js';
import channel_route from "./channel.route.js"

const router = Router();

router.use('/chat',authMiddleware,getAllChatsRoute);
router.use('/call',authMiddleware,call_route);
router.use('/status',authMiddleware,getAllStatusRoute);
router.use('/channel',authMiddleware,channel_route);

export default router;
