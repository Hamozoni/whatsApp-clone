import { Router } from 'express';
import message_route from './message.route.js';
import contact_route from './contact.route.js';
import user_route from './user.route.js';
import notification_route from './notification.route.js'
import chat_route from "./chat.route.js";
import call_route from "./call.route.js";

const router = Router();

router.use('/message',message_route);
router.use('/user',user_route);
router.use('/notification',notification_route);
router.use('/contact',contact_route);
router.use('/chat',chat_route);
router.use('/call',call_route);

export default router;
