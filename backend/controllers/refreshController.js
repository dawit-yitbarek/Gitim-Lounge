import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export function refreshToken(req, res) {
    const refreshtoken = req.cookies.refreshToken;

    if (!refreshtoken) return res.status(401).json({ success: false, message: "No refresh token provided" });
    try {
        const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET);
        const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        return res.json({ accessToken: newAccessToken, success: true });
    } catch (error) {
        console.log("Error on refreshToken function", error);
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "None" });
        return res.json({ success: false, message: "Server error" });
    }
}