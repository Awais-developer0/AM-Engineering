const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    productName: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "" },
    price: { type: String, trim: true, default: "" },
    quantity: { type: Number, required: true, default: 1, min: 1 },
    userId: { type: String, required: true },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending"
    },
    note: { type: String, trim: true, default: "" },
}, { timestamps: true })

const Order = mongoose.model("orders", orderSchema)
module.exports = Order
