import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cartItem = await Cart.findOne({ user: req.user.id, product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ user: req.user.id, product: productId, quantity });
    }
    res.json({ message: "Added to cart", cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const viewCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate("product");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    res.json({ cart: cartItems, totalPrice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
