import pool from "../models/db.js";

export async function getTestimonials(req, res) {

    try {
        const testimonials = await pool.query("SELECT * FROM testimonials ")
        res.status(200).json({ testimonials: testimonials.rows, success: true })
    } catch (error) {
        res.status(500).json({ success: false })
    }
};

export async function postTestimonials(req, res) {
    const userId = req.user.id
    const { message } = req.body;

    try {
        const user = await pool.query("SELECT name, profile_image FROM users WHERE id = $1", [userId])
        await pool.query("INSERT INTO testimonials (userId, name, image, message) VALUES ($1, $2, $3, $4)", [userId, user.rows[0].name, user.rows[0].profile_image, message])
        res.status(200).json({ success: true })
    } catch (error) {
        console.log("error from postTestimonials function : ", error)
        res.status(500).json({ success: false })
    }
};