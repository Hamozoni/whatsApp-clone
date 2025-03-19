
import {Router} from 'express';
import { get_user_controller, post_user_controller } from '../controllers/user_controller.js';


const user_router = Router();


user_router.get('/user',get_user_controller);
user_router.post('/user',post_user_controller);

export default user_router;


