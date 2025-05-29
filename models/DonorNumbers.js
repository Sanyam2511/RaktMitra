const mongoose = require("mongoose");

const DonorNumbersSchema = new mongoose.Schema({
    bloodGroup: { type: String, required: true },
    donorNumbers: [{ type: String }],  // Array to store multiple phone numbers
    locations: [{ type: String }]      // Changed from String to Array
});

module.exports = mongoose.model("DonorNumbers", DonorNumbersSchema);
