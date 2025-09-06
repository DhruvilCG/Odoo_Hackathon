import db from "../config/db.js";

export const addToCart = (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity } = req.body;

  db.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity=quantity+?",
    [user_id, product_id, quantity, quantity],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Added to cart" });
    }
  );
};

export const viewCart = (req, res) => {
  const user_id = req.user.id;
  db.query(
    `SELECT c.id as cart_id, p.* , c.quantity 
     FROM cart c JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      const totalPrice = results.reduce((sum, item) => sum + item.price * item.quantity, 0);
      res.json({ cart: results, totalPrice });
    }
  );
};

export const removeFromCart = (req, res) => {
  const user_id = req.user.id;
  const cart_id = req.params.id;
  db.query("DELETE FROM cart WHERE id = ? AND user_id = ?", [cart_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Removed from cart" });
  });
};
