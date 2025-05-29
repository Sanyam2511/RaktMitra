const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const notifyRoute = require("./routes/notify");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const authRoutes = require("./routes/authRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/blood-request", bloodRequestRoutes);
app.use("/api/bloodbank", bloodBankRoutes);
app.use("/api/users", (req, res, next) => {
    console.log("user routes hit");
    next();
}, userRoutes);
app.use("/api/notify", notifyRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "client", "build"))); 

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); 
});

app.get("/health", (req, res) => {
    res.json({ status: "✅ API is running", timestamp: new Date().toISOString() });
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
