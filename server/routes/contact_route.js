import { Router } from "express";
import { post_contact_controller } from "../controllers/contact_controllerjs";


const router = Router();

router.post('/craete_contact',post_contact_controller);

export default router;