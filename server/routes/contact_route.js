import { Router } from "express";
import { get_contact_controller, update_contact_controller } from "../controllers/contact_controller.js";


const router = Router();

router.get('/contact',get_contact_controller);
router.put('/contact',update_contact_controller);

export default router;