import { validateToken } from "../services/authentication.js";

export default function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  try {
    const user = validateToken(token);
    req.user = user; 
    
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
}