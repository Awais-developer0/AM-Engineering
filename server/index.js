const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connectDB } = require("./config/db")
const authRoutes = require("./routes/auth")
const messageRoutes = require("./routes/messages")
const orderRoutes = require("./routes/orders")
const productRoutes = require("./routes/products")

const app = express()
connectDB()

app.use(express.json({ limit: "25mb" }))
app.use(express.urlencoded({ extended: true, limit: "25mb" }))
app.use(cors())
app.use("/auth", authRoutes)
app.use("/messages", messageRoutes)
app.use("/orders", orderRoutes)
app.use("/products", productRoutes)

app.listen(8000, (req, res) => {
    console.log("server is running on port:" + 8000)
})

app.get("/", (req, res) => {
    res.send("Server is running on port")
})
app.get("/health", (req, res) => {
    res.send("Server health is good")
})

//mongodb+srv://awaisdeveloper22_db_user:<db_password>@cluster0.k4f4wml.mongodb.net/