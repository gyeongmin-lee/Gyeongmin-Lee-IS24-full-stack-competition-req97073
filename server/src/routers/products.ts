import express from "express";
import productService from "../services/productService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(productService.getEntries());
});

export default router;
