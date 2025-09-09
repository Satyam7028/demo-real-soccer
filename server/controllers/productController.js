import Product from "../models/Product.js";

// GET /api/products?category=&q=&page=&limit=
export const getProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const q = req.query.q ? { $text: { $search: req.query.q } } : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const filter = { ...q, ...category };

  const total = await Product.countDocuments(filter);
  const items = await Product.find(filter)
    .skip((page-1)*limit)
    .limit(limit);

  res.json({ items, page, pages: Math.ceil(total/limit), total });
};

export const getProductById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
};

export const createProduct = async (req, res) => {
  const prod = await Product.create(req.body);
  res.status(201).json(prod);
};

export const updateProduct = async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: "Not found" });
  Object.assign(prod, req.body);
  await prod.save();
  res.json(prod);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
