import Cart from "../models/Cart.js";
import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";

export const checkout = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id });
    if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

    for (const item of cartItems) {
      const product = await Product.findById(item.product);
      await Purchase.create({
        user: req.user.id,
        product: product._id,
        quantity: item.quantity,
        pricePaid: product.price * item.quantity,
      });
    }

    await Cart.deleteMany({ user: req.user.id });
    res.json({ message: "Checkout successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const previousPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id }).populate("product");
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
