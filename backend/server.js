import 'dotenv/config'

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

// ✅ Proper CORS Setup for Multiple Frontends
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",   // User App (Frontend)
  process.env.ADMIN_URL || "http://localhost:5174"     // Admin Panel (Frontend)
]

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// DB Connection
connectDB()

// API Endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API Working")
})

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`)
})
