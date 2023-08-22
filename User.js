import mongoose from "mongoose";

const User = new mongoose.Schema({
    phone: { type: String },
    about: { type: String },
    avatar: { type: Object },
    products: { type: Array },
    favorites: { type: Array },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.model("User", User);
