import { Router } from 'express';
import message_route from './message.route.js';
import contact_route from './contact.route.js';
import user_route from './user.route.js';
import notification_route from './notification.route.js'
import chat_route from "./chat.route.js";
import call_route from "./call.route.js";
import status_route from './status.route.js';
import channel_route from "./channel.route.js"
import authenticate_and_sync_user from '../middleware/auth.middleware.js';

const router = Router();

router.use('/message',authenticate_and_sync_user,message_route);
router.use('/user',authenticate_and_sync_user,user_route);
router.use('/notification',authenticate_and_sync_user,notification_route);
router.use('/contact',authenticate_and_sync_user,contact_route);
router.use('/chat',authenticate_and_sync_user,chat_route);
router.use('/call',authenticate_and_sync_user,call_route);
router.use('/status',authenticate_and_sync_user,status_route);
router.use('/channel',authenticate_and_sync_user,channel_route);

export default router;
