
import {Router} from 'express';
import { get_user_controller, post_user_controller } from '../controllers/user.controller.js';


const router = Router();


router.route('/')
.get(get_user_controller)
.post(post_user_controller);

export default router;


