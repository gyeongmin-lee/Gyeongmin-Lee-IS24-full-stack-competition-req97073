import express from "express";
import productService from "../services/productService";
import { toNewProductEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(productService.getEntries());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = productService.getOneEntry(id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
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

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const newProductEntry = toNewProductEntry(req.body);
    const updatedEntry = productService.updateEntry(id, newProductEntry);
    if (updatedEntry) {
      res.status(200).json(updatedEntry);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ message: errorMessage });
  }
});

export default router;
