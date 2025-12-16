// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protect = async (req, res, next) => {
  let token = null;

  // Check ALL possible places for token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  }

  if (!token && req.headers.token) {
    token = req.headers.token;
  }

  if (!token && req.body.token) {
    token = req.body.token;
  }

  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ FIXED: Allow @admin and @tutor name suffixes OR Tutor role
const tutor = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, no user" });
  }

  const email = req.user.email?.toLowerCase() || "";
  const isTutorRole = req.user.role === "Tutor";
  
  // Check if email contains @admin or @tutor
  const hasAdminTag = email.includes("@admin");
  const hasTutorTag = email.includes("@tutor");

  if (isTutorRole || hasAdminTag || hasTutorTag) {
    return next();
  }

  return res.status(403).json({ 
    message: "Not authorized as Tutor. Must have @admin or @tutor in email, or Tutor role." 
  });
};

module.exports = { protect, tutor };