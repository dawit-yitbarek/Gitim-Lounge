import pool from "../models/db.js";

export async function getAuthorPoems(req, res) {
    const userId = req.user?.id || req.params.authorId;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is missing." });
    }

    try {
        const poems = await pool.query("SELECT * FROM poems WHERE user_id = $1", [userId]);
        res.status(200).json(poems.rows);
    } catch (error) {
        console.error("Error fetching poems:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export async function postPoem(req, res) {
    const { title, description, content } = req.body;
    const userId = req.user.id;

    try {
        const newPoem = await pool.query(
            "INSERT INTO poems (title, description, content, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, content, userId]
        );
        res.status(201).json({ newPoem: newPoem.rows[0] });
    } catch (error) {
        console.error("Error posting poem:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export async function deletePoem(req, res) {
    const { poemId } = req.params;
    const userId = req.user.id;
    try {
        const result = await pool.query("DELETE FROM poems WHERE id = $1 AND user_id = $2 RETURNING *", [poemId, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Poem not found or you do not have permission to delete it" });
        }

        res.status(200).json({ success: true, message: "Poem deleted successfully" });
    } catch (error) {
        console.error("Error deleting poem:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export async function getFeaturedPoems(req, res) {

    try {
        const featuredPoems = await pool.query(`
        SELECT 
        poems.id AS poem_id,
        poems.title,
        poems.created_at,
        poems.content,
        poems.likes_count,
        poems.description,
        users.id AS author_id,
        users.name,
        users.profile_image
        FROM poems
     JOIN users ON poems.user_id = users.id
     ORDER BY poems.likes_count DESC LIMIT 3;
`);
        res.status(200).json({ featuredPoems: featuredPoems.rows });
    } catch (error) {
        console.error("Error fetching featured poems:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export async function getAllPoems(req, res) {

    try {
        const poems = await pool.query(`
        SELECT 
        poems.id AS poem_id,
        poems.title,
        poems.created_at,
        poems.content,
        poems.likes_count,
        poems.description,
        users.id AS author_id,
        users.name,
        users.profile_image
        FROM poems
     JOIN users ON poems.user_id = users.id
     ORDER BY poems.created_at DESC;
`);
        res.status(200).json({ poems: poems.rows });
    } catch (error) {
        console.error("Error fetching featured poems:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
