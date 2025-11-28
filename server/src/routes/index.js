import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import chatsRoute from "./chat.route.js";
import callsRoute from "./call.route.js";
import statusRoute from './status.route.js';
import channelsRoute from "./channel.route.js"
import usersRoute from "./user.route.js";

const router = Router();

router.use('/chat', authMiddleware, chatsRoute);
router.use('/call', authMiddleware, callsRoute);
router.use('/status', authMiddleware, statusRoute);
router.use('/channel', authMiddleware, channelsRoute);
router.use('/user', authMiddleware, usersRoute);

export default router;
