import db from "../config/db.js";

// Add product
export const addProduct = (req, res) => {
  const user_id = req.user.id;
  const {
    title, category, description, price, quantity, condition,
    year_of_manufacture, brand, model, length, width, height,
    weight, material, color, original_packaging, manual_included,
    working_condition, image_url
  } = req.body;

  db.query(
    `INSERT INTO products 
    (user_id, title, category, description, price, quantity, condition, year_of_manufacture, brand, model, length, width, height, weight, material, color, original_packaging, manual_included, working_condition, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id, title, category, description, price, quantity, condition,
      year_of_manufacture, brand, model, length, width, height, weight,
      material, color, original_packaging, manual_included, working_condition, image_url
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Product added successfully", productId: result.insertId });
    }
  );
};

// List products with optional search, filter, sort
export const listProducts = (req, res) => {
  const { category, search, sort } = req.query;
  let query = "SELECT * FROM products WHERE status='Available'";
  const params = [];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }
  if (search) {
    query += " AND title LIKE ?";
    params.push(`%${search}%`);
  }
  if (sort) {
    if (sort === "price_asc") query += " ORDER BY price ASC";
    else if (sort === "price_desc") query += " ORDER BY price DESC";
    else if (sort === "newest") query += " ORDER BY created_at DESC";
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get single product details
export const getProduct = (req, res) => {
  const productId = req.params.id;
  db.query("SELECT * FROM products WHERE id = ?", [productId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
};

// Update product
export const updateProduct = (req, res) => {
  const user_id = req.user.id;
  const productId = req.params.id;
  const fields = req.body;

  db.query(
    "UPDATE products SET ? WHERE id = ? AND user_id = ?",
    [fields, productId, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found or not yours" });
      res.json({ message: "Product updated successfully" });
    }
  );
};

// Delete product
export const deleteProduct = (req, res) => {
  const user_id = req.user.id;
  const productId = req.params.id;

  db.query("DELETE FROM products WHERE id = ? AND user_id = ?", [productId, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found or not yours" });
    res.json({ message: "Product deleted successfully" });
  });
};
