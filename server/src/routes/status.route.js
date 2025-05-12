import {Router} from 'express';
import { get_status, post_status } from '../controllers/status.controller.js';


const router = Router();


router.route('/').post(post_status).get(get_status)

export default router