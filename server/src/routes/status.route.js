import {Router} from 'express';
import { post_status } from '../controllers/status.controller.js';


const router = Router();


router.route('/').post(post_status);

export default router