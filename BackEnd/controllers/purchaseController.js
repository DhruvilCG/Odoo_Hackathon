import db from "../config/db.js";

export const checkout = (req, res) => {
  const user_id = req.user.id;

  // Get all cart items
  db.query(
    `SELECT * FROM cart WHERE user_id = ?`,
    [user_id],
    (err, cartItems) => {
      if (err) return res.status(500).json({ error: err });
      if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

      cartItems.forEach(item => {
        db.query(
          "INSERT INTO purchases (user_id, product_id, quantity, price_paid) VALUES (?, ?, ?, ?)",
          [user_id, item.product_id, item.quantity, item.quantity * item.price_paid || 0]
        );
      });

      // Clear cart
      db.query("DELETE FROM cart WHERE user_id = ?", [user_id]);

      res.json({ message: "Checkout successful" });
    }
  );
};

export const previousPurchases = (req, res) => {
  const user_id = req.user.id;
  db.query(
    `SELECT p.*, pr.* FROM purchases pr 
     JOIN products p ON pr.product_id = p.id
     WHERE pr.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};
