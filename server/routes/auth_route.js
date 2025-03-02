
import { Router } from "express";

import { auth_user } from "../controllers/auth_controler";


const router = Router();

router.post("auth_user",auth_user);

export default router;

