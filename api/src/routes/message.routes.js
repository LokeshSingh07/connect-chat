import { Router } from "express";
const router = Router();


// import controllers/Md
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { sendMessage, allMessage } from "../controllers/message.controller.js"


// API route  
router.route("/").post(verifyJWT, sendMessage);
router.route("/:chatId").get(verifyJWT, allMessage);


export default router;