const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        console.log("authMiddleware - Raw Token:", token); // Log token

        if (!token) {
            console.log("authMiddleware - No token provided");
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        // Handle Bearer token format
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("authMiddleware - Decoded:", decoded); // Log decoded payload

        req.user = await User.findById(decoded.id).select("-password");
        console.log("authMiddleware - Authenticated User:", req.user);

        if (!req.user) {
            console.log("authMiddleware - User not found");
            return res.status(404).json({ message: "User not found" });
        }

        next(); // Proceed if authentication is successful
    } catch (error) {
        console.error("authMiddleware - Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Role-based access middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            console.log("authorizeRoles - Access Denied: Insufficient role permissions");
            return res.status(403).json({ message: "Access Denied: Insufficient role permissions" });
        }
        console.log("authorizeRoles - Authorized");
        next();
    };
};

module.exports = { authMiddleware, authorizeRoles };
