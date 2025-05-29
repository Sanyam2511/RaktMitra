const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false }, // Made it optional
  role: { type: String, enum: ["donor", "recipient"], required: true }, // Added admin role
  location: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  avatar: { type: String, default: "" }, // New field for profile picture
  bio: { type: String, maxlength: 500 }, // Optional bio field
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
