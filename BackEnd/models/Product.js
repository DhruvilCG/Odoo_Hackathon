import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  condition: String,
  yearOfManufacture: Number,
  brand: String,
  model: String,
  dimensions: { length: Number, width: Number, height: Number },
  weight: Number,
  material: String,
  color: String,
  originalPackaging: { type: Boolean, default: false },
  manualIncluded: { type: Boolean, default: false },
  workingCondition: String,
  imageUrl: String,
  status: { type: String, default: "Available" },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
