const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    service: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    userId: { type: String, default: null }, // linked if user was logged in
    userEmail: { type: String, default: null },
}, { timestamps: true })

const Message = mongoose.model("messages", messageSchema)
module.exports = Message
