import express from "express";
import productService from "../services/productService";
import { toNewProductEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(productService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newProductEntry = toNewProductEntry(req.body);
    const addedEntry = productService.addEntry(newProductEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ message: errorMessage });
  }
});

export default router;
