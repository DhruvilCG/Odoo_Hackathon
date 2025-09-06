import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if item already in cart
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

// View cart
export const viewCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id }).populate("product");

    // Map cart items to include product info or a placeholder if deleted
    const cartWithDetails = cartItems.map(item => ({
      _id: item._id,
      quantity: item.quantity,
      product: item.product
        ? {
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
          }
        : { _id: null, name: "Product no longer available", price: 0 },
    }));

    // Calculate total price safely
    const totalPrice = cartWithDetails.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );

    res.json({ cart: cartWithDetails, totalPrice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
