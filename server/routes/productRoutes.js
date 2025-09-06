import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
