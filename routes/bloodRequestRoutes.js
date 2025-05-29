const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");
const DonorNumbers = require("../models/DonorNumbers");
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

router.post("/", async (req, res) => {
    try {
        const { requester, bloodGroup, urgency, location, contact } = req.body; 

        if (!requester || !bloodGroup || !urgency || !location || !contact) { 
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (!contact.startsWith("+91") && !contact.match(/^\d{10}$/)) {
            return res.status(400).json({ message: "Contact number must start with +91 or be a valid 10-digit number" });
        }

        const bloodRequest = new BloodRequest({ requester, bloodGroup, urgency, location, contact }); 
        await bloodRequest.save();

        
        console.log("Blood Request Created:", bloodRequest);

        const matchedDonors = await DonorNumbers.findOne({
            bloodGroup: bloodGroup,
            locations: location, // Check if location is in the array
        }); 

        console.log("Matched Donors:", matchedDonors);

        if (!matchedDonors || matchedDonors.donorNumbers.length === 0) {
            return res.status(200).json({ msg: "No matching donors found, request recorded." });
        }

        for (const phoneNumber of matchedDonors.donorNumbers) {
            const message = `🔴 URGENT BLOOD REQUEST 🔴\n\nA patient in ${location} needs ${bloodGroup} blood urgently.\n\n👤 Requester: ${requester}\n📞 Contact: ${contact}\n⚠️ If you can donate, please respond immediately. Thank you for saving lives!`; // Change bloodGroup to bloodGroup

            console.log("Sending SMS to:", phoneNumber, "Message:", message);

            try {
                await client.messages.create({
                    from: twilioPhoneNumber,
                    to: phoneNumber,
                    body: message,
                });
                console.log(`SMS sent successfully to: ${phoneNumber}`);
            } catch (twilioError) {
                console.error("Error sending SMS to", phoneNumber, ":", twilioError);
            }
        }

        res.status(201).json({ msg: "Blood request created & donors notified via SMS", bloodRequest });
    } catch (error) {
        console.error("Error processing blood request:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find();
        res.status(200).json({ bloodRequests });
    } catch (error) {
        console.error("Error fetching blood requests:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

module.exports = router;