import { Router } from "express";
const router = Router();


// import controllers/Md
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chat.controller.js"


// API route  
router.route("/").post(verifyJWT, accessChat);      // create & fetch chat
router.route("/").get(verifyJWT, fetchChats);
router.route("/createGroup").post(verifyJWT, createGroupChat);
router.route("/renameGroup").patch(verifyJWT, renameGroup);
router.route("/addToGroup").patch(verifyJWT, addToGroup);
router.route("/removeFromGroup").delete(verifyJWT, removeFromGroup);



export default router;