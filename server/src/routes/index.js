import { Router } from 'express';
import message_route from './message.route.js';
import contact_route from './contact.route.js';
import user_route from './user.route.js';
import chat_route from "./chat.route.js";
import call_route from "./call.route.js";
import status_route from './status.route.js';
import channel_route from "./channel.route.js"
import auth_middleware from '../middleware/auth.middleware.js';

const router = Router();

router.use('/message',auth_middleware,message_route);
router.use('/user',auth_middleware,user_route);
router.use('/contact',auth_middleware,contact_route);
router.use('/chat',auth_middleware,chat_route);
router.use('/call',auth_middleware,call_route);
router.use('/status',auth_middleware,status_route);
router.use('/channel',auth_middleware,channel_route);

export default router;
