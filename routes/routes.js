import express from "express";
import { signUp, signIn } from "../controllers/userController.js";
import { authMiddleware } from "../auth/authMiddleware.js";
import { profile } from "../controllers/profile.js";
import { loadProducts } from "../controllers/products.js";
import { loadSingleProduct } from "../controllers/loadSingleProduct.js";
const router = express.Router();

router.get("/test",(req, res)=>{
    res.send("Route working");
});

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/profile", authMiddleware, profile);
router.get("/products", loadProducts);
router.get("/products/:id", loadSingleProduct);
export default router;