import express from "express";
const router = express.Router();



// import controllers/Md
import { signup, login, getAllUser } from "../controllers/user.controller.js" 
import { verifyJWT } from "../middlewares/auth.middleware.js"



// API route  
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getAllUser").get(verifyJWT, getAllUser);



export default router;