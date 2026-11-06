require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const Product = require("../models/product")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "am_engineering_fallback_secret"
const ADMIN_EMAIL = "ameng307@gmail.com"

// ─── Middleware: require auth ────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized", isError: true })
    }
    try { req.user = jwt.verify(authHeader.split(" ")[1], JWT_SECRET); next() }
    catch { return res.status(401).json({ message: "Invalid token", isError: true }) }
}

// ─── Middleware: admin only ──────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.email !== ADMIN_EMAIL) {
        return res.status(403).json({ message: "Admin access required", isError: true })
    }
    next()
}

// ─── GET /products — public: all products ────────────────────────────────────
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json({ products })
    } catch (error) {
        console.error("Fetch products error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── POST /products — admin: add product ─────────────────────────────────────
router.post("/", requireAuth, requireAdmin, async (req, res) => {
    try {
        const { name, category, price, stockStatus, image, description } = req.body
        if (!name || !category || !price) {
            return res.status(400).json({ message: "Name, category aur price required hain", isError: true })
        }
        const product = new Product({ name, category, price, stockStatus: stockStatus || "In Stock", image: image || "", description: description || "", addedBy: req.user.email })
        await product.save()
        res.status(201).json({ message: "Product add ho gaya!", product })
    } catch (error) {
        console.error("Add product error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── DELETE /products/:id — admin: delete product ────────────────────────────
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).json({ message: "Product nahi mila", isError: true })
        res.status(200).json({ message: "Product delete ho gaya!" })
    } catch (error) {
        console.error("Delete product error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── PATCH /products/:id — admin: update stock status ────────────────────────
router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
        const { stockStatus } = req.body
        const product = await Product.findByIdAndUpdate(req.params.id, { stockStatus }, { new: true })
        if (!product) return res.status(404).json({ message: "Product nahi mila", isError: true })
        res.status(200).json({ message: "Product update ho gaya!", product })
    } catch (error) {
        console.error("Update product error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

module.exports = router
