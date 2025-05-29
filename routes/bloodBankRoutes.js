const express = require("express");
const router = express.Router();
const BloodBank = require("../models/BloodBank");
const bcrypt = require("bcrypt");

// GET /api/bloodbank : Get all blood banks
router.get("/", async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    res.json(bloodBanks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/bloodbank : Create a new blood bank
router.post("/", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, licenseNumber, location,stock } = req.body;

    // Check if email already exists
    const existingEmail = await BloodBank.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if license number already exists
    const existingLicense = await BloodBank.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({ message: "License number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new blood bank with all required fields
    const bloodBank = new BloodBank({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      licenseNumber,
      location,
      stock,
    });

    await bloodBank.save();
    res.status(201).json({ message: "Blood bank created", bloodBank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/bloodbank/:id : Get a specific blood bank
router.get("/:id", async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).json({ message: "Blood bank not found" });
    }
    res.json(bloodBank);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/bloodbank/:id/stock : Update blood stock for a specific blood bank
router.put("/:id/stock", async (req, res) => {
  try {
    const { stock } = req.body;
    
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).json({ message: "Blood bank not found" });
    }
    
    bloodBank.stock = stock;
    await bloodBank.save();
    
    res.json({ message: "Blood stock updated", bloodBank });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;