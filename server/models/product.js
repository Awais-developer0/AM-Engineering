const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    stockStatus: { type: String, enum: ["In Stock", "Low Stock", "Out of Stock"], default: "In Stock" },
    image: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    addedBy: { type: String, default: "admin" },
}, { timestamps: true })

const Product = mongoose.model("products", productSchema)
module.exports = Product
