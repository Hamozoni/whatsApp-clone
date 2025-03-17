import { Router } from "express";
import create_contact_controller from '../controllers/create_contact_controller.js'


const router = Router();

router.post('/craete_contact',create_contact_controller);

export default router;