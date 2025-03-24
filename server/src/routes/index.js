import { Router } from 'express';
import message_route from './message.route.js';
import contact_route from './contact.route.js';
import user_route from './user.route.js';
import notification_route from './notification.route.js'

const router = Router();

router.use('/message',message_route);
router.use('/user',user_route);
router.use('/notification',notification_route);
router.use('/contact',contact_route);

export default router;
