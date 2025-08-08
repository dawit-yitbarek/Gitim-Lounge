import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function authUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.name);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ success: false, message: "Access token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Access token invalid" });
    }

    // default fallback
    return res.status(403).json({ success: false, message: "Authentication failed" });
  }
};