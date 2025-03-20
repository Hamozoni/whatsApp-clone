
import {Router} from 'express';
import { get_user_controller, post_user_controller } from '../controllers/user_controller.js';


const router = Router();


router.get('/user',get_user_controller);
router.post('/user',post_user_controller);

export default router;


