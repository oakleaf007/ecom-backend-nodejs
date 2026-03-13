import express from "express";
import { signUp, signIn } from "../controllers/userController.js";
const router = express.Router();

router.get("/test",(req, res)=>{
    res.send("Route working");
});

router.post("/signup",signUp);
router.post("/signin",signIn);


export default router;