import {Router} from 'express';
import { get_status, post_status } from '../controllers/status.controller.js';
import upload from '../middleware/upload_middleware.js';


const router = Router();


router.route('/')
.post(upload.single('file'),post_status)
.get(get_status)

export default router