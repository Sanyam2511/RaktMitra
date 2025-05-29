const User = require("../models/User");
const DonorNumbers = require("../models/DonorNumbers");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
console.log("Request Body:", req.body);
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  console.log("Request Body:", req.body); // Moved inside the function

  const { name, email, password, role, bloodGroup, location, phoneNumber, lastDonationDate } = req.body;

  try {
      let userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ message: "User already exists" });
      }

      const user = await User.create({
          name,
          email,
          password,
          role,
          bloodGroup,
          location,
          phoneNumber,
          lastDonationDate,
      });
      
      console.log("User Role:", user.role);
      
      if (user && role === "donor") {
          console.log("Registering donor:", {
              bloodGroup: bloodGroup,
              phoneNumber: phoneNumber,
              location: location,
          });

          // Use findOneAndUpdate with upsert: true to avoid duplicates
          const donorNumbersUpdate = await DonorNumbers.findOneAndUpdate(
              { bloodGroup: bloodGroup },
              {
                  $addToSet: { 
                      donorNumbers: phoneNumber,
                      locations: location
                  }
              },
              { new: true, upsert: true }
          );
          
          console.log("DonorNumbers updated:", donorNumbersUpdate);
      }

      res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bloodGroup: user.bloodGroup,
          location: user.location,
          phoneNumber: user.phoneNumber,
          lastDonationDate: user.lastDonationDate,
          token: generateToken(user._id),
      });
  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, loginUser };