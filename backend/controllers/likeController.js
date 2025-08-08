import pool from "../models/db.js";

export async function checkLike(req, res) {
    const { poemId } = req.params;
    const userId = req.user.id

    try {
        const result = await pool.query("SELECT * FROM likes WHERE poem_id = $1 AND user_id = $2", [poemId, userId]);
        if (result.rowCount > 0) {
            return res.status(200).json({ liked: true, });
        } else {
            return res.status(200).json({ liked: false });
        }
    } catch (error) {
        console.error("Error checking like status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export async function likePoem(req, res) {
    const { poemId } = req.params;
    const userId = req.user.id;

    try {
        await pool.query("INSERT INTO likes (poem_id, user_id) VALUES ($1, $2)", [poemId, userId]);
        await pool.query("UPDATE poems SET likes_count = likes_count + 1 WHERE id = $1", [poemId]);
        res.status(200).json({ success: true, message: "Poem liked successfully." });
    } catch (error) {
        console.error("Error liking poem:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};