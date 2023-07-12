import mongoose from "mongoose";

const Product = new mongoose.Schema({
  data: { type: Date },
  photo: { type: Array },
  description: { type: String },
  type: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  place: { type: String, required: true },
  seller: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.model("Product", Product);
