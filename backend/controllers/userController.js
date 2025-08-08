import pool from "../models/db.js";
import { sendContactMessage } from "../utils/sendEmail.js";

export async function getUser(req, res) {
    const userId = req.user.id

    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [userId])
        res.status(200).json({ user: user.rows[0], success: true })
    } catch (error) {
        res.status(500).json({ success: false })
        console.log("Error from getUser function ", error)
    }
};

export async function getAuthor(req, res) {
    const { authorId } = req.params;

    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [authorId])
        res.status(200).json({ user: user.rows[0], success: true })
    } catch (error) {
        res.status(500).json({ success: false })
        console.log("Error from getUser function ", error)
    }
};

export async function updateProfile(req, res) {
    const { imageUrl, name } = req.body;
    const userId = req.user.id

    try {
        await pool.query("UPDATE users SET profile_image = $1, name = $2 WHERE id = $3 ", [imageUrl, name, userId])
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false })
        console.log("Error from updateProfile function ", error)
    }
};

export async function sendMessage(req, res) {
    const { name, email, message } = req.body.userData;

    try {
        await sendContactMessage(name, email, message);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
        console.log("Error from sendMessage function ", error);
    }

}