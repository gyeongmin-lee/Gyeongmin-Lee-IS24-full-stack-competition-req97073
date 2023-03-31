/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

import express from "express";
import productService from "../services/productService";
import { ProductQueryParams } from "../types";
import { toNewProductEntry } from "../utils";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /products:
 *    get:
 *      summary: Get a list of products
 *      tags: [Products]
 *      parameters:
 *        - in: query
 *          name: type
 *          schema:
 *            type: string
 *            enum: [scrumMaster, developer]
 *          description: Filter type
 *        - in: query
 *          name: query
 *          schema:
 *            type: string
 *          description: Search query
 *      responses:
 *        "200":
 *          description: A list of products
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */
router.get("/", (req, res) => {
  const queries = req.query as ProductQueryParams;
  const entries = productService.getEntries(queries);
  res.send(entries);
});

/**
 * @swagger
 * paths:
 *  /products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Product ID
 *      responses:
 *        "200":
 *          description: A product object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        "404":
 *          description: Product not found
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = productService.getOneEntry(id);
  if (entry) {
    res.send(entry);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

/**
 * @swagger
 * paths:
 *  /products:
 *    post:
 *      summary: Add a new product
 *      tags: [Products]
 *      requestBody:
 *        description: Product object to be added
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewProductEntry'
 *      responses:
 *        "201":
 *          description: A product object that has been added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        "400":
 *          description: Bad request
 */
router.post("/", (req, res) => {
  try {
    const newEntry = toNewProductEntry(req.body);
    const addedEntry = productService.addEntry(newEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ message: errorMessage });
  }
});

/**
 * @swagger
 * paths:
 *  /products/{id}:
 *    put:
 *      summary: Update a product by ID
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Product ID
 *      requestBody:
 *        description: Product object to be updated
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewProductEntry'
 *      responses:
 *        "200":
 *          description: A product object that has been updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        "404":
 *          description: Product not found
 *        "400":
 *          description: Bad request
 */
router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const newEntry = toNewProductEntry(req.body);
    const updatedEntry = productService.updateEntry(id, newEntry);
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

/**
 * @swagger
 * paths:
 *  /products/{id}:
 *    delete:
 *      summary: Delete a product by ID
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Product ID
 *      responses:
 *        "204":
 *          description: Product has been deleted
 *        "404":
 *          description: Product not found
 *        "400":
 *          description: Bad request
 */
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedEntry = productService.deleteEntry(id);
    if (deletedEntry) {
      res.status(204).json(deletedEntry);
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
