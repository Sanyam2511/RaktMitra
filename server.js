const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

require("dotenv").config();

const app = express();
const notifyRoute = require("./routes/notify");
const userRoutes = require("./routes/userRoutes"); // Import userRoutes

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Logging Middleware to Debug Incoming Requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes"); // ✅ Added Blood Bank Routes

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/blood-request", bloodRequestRoutes);
app.use("/api/bloodbank", bloodBankRoutes); // ✅ Integrated Blood Bank Routes
app.use("/api/users", (req,res,next)=>{
    console.log("user routes hit");
    next();
}, userRoutes);// Integrate userRoutes
app.use("/api/notify", notifyRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// ✅ Default route
app.get("/", (req, res) => {
    res.send("🚀 Blood Donation Platform API is running...");
});

// ✅ Health Check Route (Useful for Debugging)
app.get("/health", (req, res) => {
    res.json({ status: "✅ API is running", timestamp: new Date().toISOString() });
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
});

// ✅ Gracefully Handle Process Exit
process.on("SIGINT", async () => {
    console.log("🔴 Closing MongoDB Connection...");
    await mongoose.connection.close();
    console.log("🔴 MongoDB Disconnected. Exiting Process.");
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("🔴 SIGTERM received. Closing MongoDB Connection...");
    await mongoose.connection.close();
    console.log("🔴 MongoDB Disconnected. Exiting Process.");
    process.exit(0);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000; // Uses .env PORT, or defaults to 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));