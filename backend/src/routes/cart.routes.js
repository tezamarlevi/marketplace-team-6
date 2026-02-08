import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);

export default router;
