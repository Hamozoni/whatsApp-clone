
import { Router } from 'express';
import { getAllUsersController, getUserController } from '../controllers/user.controller.js';


const router = Router();


router.route('/')
    .get(getAllUsersController)

router.route('/:email')
    .get(getUserController)

export default router;


