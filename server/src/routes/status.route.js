import {Router} from 'express';
import { get_status, post_status } from '../controllers/status.controller.js';
import upload_middleware from '../middleware/upload.middleware.js';


const router = Router();


router.route('/')
.post(upload_middleware.single('file'),post_status)
.get(get_status)

export default router