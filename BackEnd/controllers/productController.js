import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const productData = { ...req.body, user: req.user.id };
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Products (with optional search by title)
export const listProducts = async (req, res) => {
  try {
    const { q } = req.query; // search query
    let filter = {};

    if (q) {
      filter.title = { $regex: q, $options: "i" }; // case-insensitive search
    }

    const products = await Product.find(filter).populate("user", "displayName email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("user", "displayName email");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
