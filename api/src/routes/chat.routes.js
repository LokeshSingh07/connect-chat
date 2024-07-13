import { Router } from "express";
const router = Router();


// import controllers/Md
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { accessChat, fetchChats } from "../controllers/chat.controller.js"


// API route  
router.route("/").post(verifyJWT, accessChat);      // create & fetch chat
router.route("/").get(verifyJWT, fetchChats);




export default router;