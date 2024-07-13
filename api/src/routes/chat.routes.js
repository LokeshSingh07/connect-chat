import { Router } from "express";
const router = Router();


// import controllers/Md
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { accessChat } from "../controllers/chat.controller.js"


// API route  
router.route("/").post(verifyJWT, accessChat);




export default router;