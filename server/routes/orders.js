require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const Order = require("../models/order")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "am_engineering_fallback_secret"
const ADMIN_EMAIL = "ameng307@gmail.com"

// ─── Middleware: require auth ────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Login karein order karne ke liye", isError: true })
    }
    try {
        req.user = jwt.verify(authHeader.split(" ")[1], JWT_SECRET)
        next()
    } catch (_) {
        return res.status(401).json({ message: "Invalid token", isError: true })
    }
}

// ─── Middleware: admin only ──────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.email !== ADMIN_EMAIL) {
        return res.status(403).json({ message: "Admin access required", isError: true })
    }
    next()
}

// ─── POST /orders — create order (login required) ────────────────────────────
router.post("/", requireAuth, async (req, res) => {
    try {
        const { productName, category, price, quantity, note } = req.body
        if (!productName || !quantity) {
            return res.status(400).json({ message: "Product name and quantity required", isError: true })
        }
        const newOrder = new Order({
            productName,
            category: category || "",
            price: price || "",
            quantity: parseInt(quantity) || 1,
            userId: req.user.uid,
            userName: req.user.fullName,
            userEmail: req.user.email,
            note: note || "",
            status: "pending",
        })
        await newOrder.save()
        res.status(201).json({ message: "Order placed successfully!", order: newOrder })
    } catch (error) {
        console.error("Order create error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── GET /orders — admin: all orders ────────────────────────────────────────
router.get("/", requireAuth, requireAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        res.status(200).json({ orders })
    } catch (error) {
        console.error("Fetch orders error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── GET /orders/mine — user's own orders ────────────────────────────────────
router.get("/mine", requireAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.uid }).sort({ createdAt: -1 })
        res.status(200).json({ orders })
    } catch (error) {
        console.error("Fetch my orders error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── PATCH /orders/:id/status — admin: update order status ───────────────────
router.patch("/:id/status", requireAuth, requireAdmin, async (req, res) => {
    try {
        const { status } = req.body
        const validStatuses = ["pending", "processing", "completed", "cancelled"]
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value", isError: true })
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!order) {
            return res.status(404).json({ message: "Order not found", isError: true })
        }
        res.status(200).json({ message: "Order status updated!", order })
    } catch (error) {
        console.error("Update order status error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

module.exports = router
