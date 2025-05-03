import { Router } from "express";
import { post_call } from "../controllers/call.cotroller.js";

const router = Router();

router.route('/').post(post_call);


export default router