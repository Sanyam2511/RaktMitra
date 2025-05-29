const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const DonorNumbers = require("../models/DonorNumbers");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
    try {
        console.log("========== REGISTRATION STARTED ==========");
        console.log("Request Body:", req.body);
        
        const { name, email, password, phoneNumber, location, role, bloodGroup } = req.body;
        console.log("Extracted data:", { name, email, role, bloodGroup, location, phoneNumber });

        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, phoneNumber, location, role, bloodGroup });
        await user.save();
        console.log("User created successfully:", user._id);

        // If the user is a donor, store their phone number separately
        if (role === "donor" && bloodGroup && location && phoneNumber) {
            console.log("Processing donor with blood group:", bloodGroup);
            
            // Only search by blood group, not location
            const existingDonor = await DonorNumbers.findOne({ bloodGroup: bloodGroup });
            console.log("Existing donor found:", existingDonor ? "Yes" : "No");

            if (existingDonor) {
                // If a document with the blood group exists, push both phone number and location
                console.log("Updating existing donor document");
                await DonorNumbers.updateOne(
                    { bloodGroup: bloodGroup },
                    { 
                        $addToSet: { 
                            donorNumbers: phoneNumber,
                            locations: location 
                        }
                    }
                );
            } else {
                // If no document exists, create a new one
                console.log("Creating new donor document");
                await DonorNumbers.create({
                    bloodGroup: bloodGroup,
                    locations: [location],
                    donorNumbers: [phoneNumber],
                });
            }
            
            // Verify the update
            const verifyDoc = await DonorNumbers.findOne({ bloodGroup: bloodGroup });
            console.log("Verification:", {
                id: verifyDoc._id,
                bloodGroup: verifyDoc.bloodGroup,
                locations: verifyDoc.locations,
                donorNumbers: verifyDoc.donorNumbers
            });
        } else {
            console.log("Skipping donor processing - missing data or not a donor");
            console.log("Role:", role);
            console.log("Blood Group:", bloodGroup);
            console.log("Location:", location);
            console.log("Phone Number:", phoneNumber);
        }

        console.log("Sending successful response");
        res.status(201).json({ message: "User registered successfully" });
        console.log("========== REGISTRATION COMPLETED ==========");
    } catch (err) {
        console.error("ERROR IN REGISTRATION:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        console.log("========== LOGIN STARTED ==========");
        console.log("Login Request Body:", req.body);
        
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid credentials - user not found:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials - password mismatch for:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Login successful for:", email);

        res.json({ token, user });
        console.log("========== LOGIN COMPLETED ==========");
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;