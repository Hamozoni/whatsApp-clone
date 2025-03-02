// const express = require("express");
import { Router } from "express";

import find_user  from "../controllers/auth_controller.js";


const router = Router();

router.post("find_user",find_user);

export default router;

