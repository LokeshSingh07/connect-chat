import express from "express";
const router = express.Router();



import { singup, login, getAllUser } from "../controllers/user.controller.js" 


router.route("/signup").post(singup);
router.route("/login").post(login);
router.route("/getAllUser").get(getAllUser);




export default router;