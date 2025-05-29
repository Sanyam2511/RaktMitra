const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authMiddleware, authorizeRoles } = require("../middleware/authMiddleware");
const User = require("../models/User");
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/', // Store uploaded files in the 'uploads' directory
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('profilePicture'); // 'profilePicture' matches the key in FormData

// ✅ User Registration
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role, bloodGroup, location } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role, bloodGroup, location });

        console.log("Registering User:", user);
        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Configurable token expiry
        );

        console.log("User Logged In:", user.email);
        res.json({ 
            token, 
            user: { _id: user._id, name: user.name, email: user.email, role: user.role, bloodGroup, location } 
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Get User Profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Profile accessed:", user.email);
        res.json(user);
    } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Update User Profile
router.put("/profile", authMiddleware, upload, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from auth middleware
        const { name, phoneNumber, location, bloodGroup } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;
        if (location) updateFields.location = location;
        if (bloodGroup) updateFields.bloodGroup = bloodGroup;

        if (req.file) {
            updateFields.avatar = '/uploads/' + req.file.filename; // Store the file path
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Profile Updated:", updatedUser.email);
        res.json(updatedUser);
    } catch (error) {
        console.error("Profile Update Error:", error.message);
        res.status(500).json({ message: "Profile update failed", error: error.message });
    }
});

// ✅ Get Donors List
router.get("/donors", authMiddleware, authorizeRoles("donor", "admin"), async (req, res) => {
    try {
        const donors = await User.find({ role: "donor" }).select("-password");

        if (donors.length === 0) {
            return res.status(404).json({ message: "No donors found" });
        }

        console.log("Donor List Fetched");
        res.json(donors);
    } catch (error) {
        console.error("Donor Fetch Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Request Blood
router.post("/request-blood", authMiddleware, authorizeRoles("recipient"), async (req, res) => {
    try {
        const { bloodGroup, location } = req.body;

        const donors = await User.find({ bloodGroup, location, role: "donor" });

        if (donors.length === 0) {
            console.log("No donors found for:", bloodGroup, location);
            return res.status(404).json({ message: "No donors found in this area" });
        }

        console.log("Blood Request - Matching Donors Found");
        res.json(donors);
    } catch (error) {
        console.error("Blood Request Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Get All Users (Admin Only)
router.get("/all-users", authMiddleware, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        console.log("Admin fetched all users");
        res.json(users);
    } catch (error) {
        console.error("User Fetch Error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;