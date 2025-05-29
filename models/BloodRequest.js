const mongoose = require("mongoose");

const BloodRequestSchema = new mongoose.Schema({
  requester: { type: String, required: true },
  bloodGroup: { 
    type: String, 
    enum : ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+","O-"],
    required: true },
  urgency: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    required: true 
  },
  location: { type: String, required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model("BloodRequest", BloodRequestSchema);
