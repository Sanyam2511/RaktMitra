const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const DonorNumbers = require("../models/DonorNumbers");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Use regular Twilio number

const client = twilio(accountSid, authToken);

router.post("/notify-donors", async (req, res) => {
    const { bloodGroup, location } = req.body; // Changed bloodGroup to bloodGroup

    if (!bloodGroup || !location) { // Changed bloodGroup to bloodGroup
        return res.status(400).json({ msg: "Blood group and location are required." }); // Changed blood type to blood group
    }

    try {
        // Fetch donor numbers with matching blood group and location
        const donors = await DonorNumbers.find({ bloodGroup, location }); // Changed bloodGroup to bloodGroup

        if (donors.length === 0) {
            return res.status(404).json({ msg: "No registered donors found." });
        }

        let allPromises = [];

        for (const donor of donors) {
            for (const number of donor.donorNumbers) {
                const message = `🚨 Urgent Blood Request! 🚨\nA patient needs ${bloodGroup} blood at ${location}. If you can help, please reply.`; // Changed bloodGroup to bloodGroup
                const messagePromise = client.messages.create({
                    from: twilioPhoneNumber,
                    to: number,
                    body: message,
                });
                allPromises.push(messagePromise);
            }
        }

        await Promise.all(allPromises);
        res.json({ msg: `Notified all donors successfully!` });
    } catch (error) {
        console.error("Error notifying donors:", error);
        res.status(500).json({ msg: "Failed to notify donors.", error: error.message });
    }
});

module.exports = router;