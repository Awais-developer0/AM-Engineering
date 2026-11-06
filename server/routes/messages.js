require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const Message = require("../models/message")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "am_engineering_fallback_secret"
const ADMIN_EMAIL = "ameng307@gmail.com"

// ─── Middleware: optional auth (link message to user if logged in) ─────────────
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const decoded = jwt.verify(authHeader.split(" ")[1], JWT_SECRET)
            req.user = decoded
        } catch (_) { /* ignore invalid token */ }
    }
    next()
}

// ─── Middleware: require auth ────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized", isError: true })
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

// ─── POST /messages — submit contact form (anyone, linked if logged in) ───────
router.post("/", optionalAuth, async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are required", isError: true })
        }
        const newMsg = new Message({
            name,
            email,
            phone: phone || "",
            service: service || "",
            message,
            userId: req.user?.uid || null,
            userEmail: req.user?.email || null,
        })
        await newMsg.save()
        res.status(201).json({ message: "Message sent successfully!" })
    } catch (error) {
        console.error("Message save error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── GET /messages — admin: all messages ────────────────────────────────────
router.get("/", requireAuth, requireAdmin, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 })
        res.status(200).json({ messages })
    } catch (error) {
        console.error("Fetch messages error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── GET /messages/mine — logged-in user's own messages ─────────────────────
router.get("/mine", requireAuth, async (req, res) => {
    try {
        const messages = await Message.find({ userId: req.user.uid }).sort({ createdAt: -1 })
        res.status(200).json({ messages })
    } catch (error) {
        console.error("Fetch my messages error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

module.exports = router
