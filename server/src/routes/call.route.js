import { Router } from "express";
import { postCall,updateCall } from "../controllers/call.cotroller.js";

const router = Router();

router.route('/')
.post(postCall)
.put(updateCall)


export default router