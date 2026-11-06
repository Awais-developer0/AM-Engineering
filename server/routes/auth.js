require("dotenv").config()
const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")
const Users = require("../models/auth")

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || "am_engineering_fallback_secret"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

// ─── Helper: generate token ──────────────────────────────────────────────────
const generateToken = (user) => {
    return jwt.sign(
        { uid: user.uid, email: user.email, fullName: user.fullName },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    )
}

// ─── Middleware: verify token ─────────────────────────────────────────────────
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided", isError: true })
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token", isError: true })
    }
}

// ─── POST /auth/register ──────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        // Validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required", isError: true })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters", isError: true })
        }

        // Check duplicate email
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use", isError: true })
        }

        // Hash password & create user
        const hashedPassword = await bcrypt.hash(password, 10)
        const uid = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

        const newUser = new Users({ uid, fullName, email, password: hashedPassword })
        await newUser.save()

        // Return token immediately (auto-login after register)
        const token = generateToken(newUser)

        res.status(201).json({
            message: "Account created successfully!",
            token,
            user: { uid: newUser.uid, fullName: newUser.fullName, email: newUser.email }
        })

    } catch (error) {
        console.error("Register error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── POST /auth/login ─────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", isError: true })
        }

        // Find user
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", isError: true })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password", isError: true })
        }

        const token = generateToken(user)

        res.status(200).json({
            message: "Login successful!",
            token,
            user: { uid: user.uid, fullName: user.fullName, email: user.email }
        })

    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── GET /auth/me (protected) ─────────────────────────────────────────────────
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await Users.findOne({ uid: req.user.uid }).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found", isError: true })
        }
        res.status(200).json({
            user: { uid: user.uid, fullName: user.fullName, email: user.email, avatar: user.avatar || '', bio: user.bio || '', createdAt: user.createdAt }
        })
    } catch (error) {
        console.error("Me error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── PUT /auth/profile (protected) ─────────────────────────────────────────
router.put("/profile", verifyToken, async (req, res) => {
    try {
        const { fullName, bio, avatar } = req.body

        if (!fullName || fullName.trim().length < 2) {
            return res.status(400).json({ message: "Full name must be at least 2 characters", isError: true })
        }

        // avatar is base64 string — limit size (~700 KB max)
        if (avatar && avatar.length > 700000) {
            return res.status(400).json({ message: "Image size too large. Please use a smaller image.", isError: true })
        }

        const updateData = { fullName: fullName.trim(), bio: (bio || '').trim() }
        if (avatar !== undefined) updateData.avatar = avatar

        const updatedUser = await Users.findOneAndUpdate(
            { uid: req.user.uid },
            { $set: updateData },
            { new: true, select: "-password" }
        )

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", isError: true })
        }

        res.status(200).json({
            message: "Profile updated successfully!",
            user: { uid: updatedUser.uid, fullName: updatedUser.fullName, email: updatedUser.email, avatar: updatedUser.avatar || '', bio: updatedUser.bio || '' }
        })
    } catch (error) {
        console.error("Profile update error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

// ─── POST /auth/seed-admin — ek baar call karo admin account banane ke liye ──
router.post("/seed-admin", async (req, res) => {
    try {
        const ADMIN_EMAIL = "ameng307@gmail.com"
        const ADMIN_PASSWORD = "ameng307"
        const ADMIN_NAME = "AM Engineering Admin"

        const existing = await Users.findOne({ email: ADMIN_EMAIL })
        if (existing) {
            return res.status(409).json({ message: "Admin already exists!", isError: false })
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)
        const uid = "admin_" + Math.random().toString(36).slice(2)

        const admin = new Users({ uid, fullName: ADMIN_NAME, email: ADMIN_EMAIL, password: hashedPassword })
        await admin.save()

        res.status(201).json({ message: "Admin account created successfully! Email: " + ADMIN_EMAIL })
    } catch (error) {
        console.error("Seed admin error:", error)
        res.status(500).json({ message: "Internal server error", isError: true })
    }
})

module.exports = router