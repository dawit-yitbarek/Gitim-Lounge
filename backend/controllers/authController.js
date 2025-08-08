import pool from "../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { sendVerificationCode, sendResetPasswordEmail } from "../utils/sendEmail.js";

dotenv.config();

export async function signUp(req, res) {
    const { email, password, name } = req.body;

    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
        const hashedPassword = await bcrypt.hash(password, 5);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        await pool.query(
            `INSERT INTO pending_users (name, email, password, code, expires_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET name = $1, password = $3, code = $4, expires_at = $5`,
            [name, email, hashedPassword, code, expiresAt]
        );

        await sendVerificationCode(email, code);

        res.status(200).json({
            success: true,
            message: "Verification code sent to your email",
        });
    } catch (error) {
        console.error("Error in signUp function:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong." });
    };
};


export async function verifyCode(req, res) {
    const { email, code } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM pending_users WHERE email = $1 AND code = $2",
            [email, code]
        );

        if (result.rows.length === 0 || new Date(result.rows[0].expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired code" });
        }

        const { name, password } = result.rows[0];

        // Save to actual users table
        const userInsert = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, password]
        );

        const userId = userInsert.rows[0].id;

        // Remove from pending_users
        await pool.query("DELETE FROM pending_users WHERE email = $1", [email]);

        // Tokens
        const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "150d" });
        const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000 * 60 * 60 * 24 * 30 * 5, // 5 months
        });

        res.status(200).json({
            success: true,
            accessToken,
            message: "User verified and registered successfully",
        });
    } catch (err) {
        console.error("Error verifyingCode function:", err.message);
        res.status(500).json({ success: false, message: "Verification failed" });
    };
};

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found with this email." });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "150d" });
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000 * 60 * 60 * 24 * 30 * 5,
        });

        res.status(200).json({
            success: true,
            accessToken,
            message: "Login successful",
        });
    } catch (error) {
        console.error("Error in signIn function :", error.message);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    };
};


export async function sendResetCode(req, res) {
    const { email } = req.body;

    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length === 0) {
            return res.status(400).json({ success: false, message: "User doesn't exists with this email" });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await pool.query(
            `INSERT INTO pending_users ( email, code, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET code = $2, expires_at = $3`,
            [email, code, expiresAt]
        );

        await sendResetPasswordEmail(email, code);

        res.status(200).json({
            success: true,
            message: "Verification code sent to your email",
        });
    } catch (error) {
        console.error("Error in sendResetCode function:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong." });
    };
};


export async function resetPassword(req, res) {
    const { email, code, newPassword } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM pending_users WHERE email = $1 AND code = $2",
            [email, code]
        );

        if (result.rows.length === 0 || new Date(result.rows[0].expires_at) < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired code" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 5);

        const userInsert = await pool.query(
            "UPDATE users SET password = $1 WHERE email = $2 RETURNING id",
            [hashedPassword, email]
        );

        const userId = userInsert.rows[0].id;

        // Remove from pending_users
        await pool.query("DELETE FROM pending_users WHERE email = $1", [email]);

        // Tokens
        const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "150d" });
        const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000 * 60 * 60 * 24 * 30 * 5,
        });

        res.status(200).json({
            success: true,
            accessToken,
            message: "Password reseted successfully",
        });
    } catch (err) {
        console.error("Error verifyingCode function:", err.message);
        res.status(500).json({ success: false, message: "Verification failed" });
    };
};


export function logOut(req, res) {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error logOut function :", error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    };
};