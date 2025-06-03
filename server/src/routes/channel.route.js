import { Router } from "express";
import { post_channel } from "../controllers/channel.controller.js";

const router = Router();

router.route('/').post(post_channel);


export default router;