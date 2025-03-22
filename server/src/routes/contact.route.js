import { Router } from "express";
import { get_contact_controller, update_contact_controller } from "../controllers/contact.controller.js";


const router = Router();

router.route('/')
.get(get_contact_controller)
.put(update_contact_controller);

export default router;