import {Router} from "express";
import create_user from "../controllers/create_user_controller.js";


const router = Router();

router.post('/create_user',create_user);


export default router;