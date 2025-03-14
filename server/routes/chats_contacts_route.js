
import {Router} from 'express';

import get_chats_contacts from '../controllers/chats_contacts_controller.js';


const router = Router();


router.get('/chats_contacts',get_chats_contacts);

export default router;


