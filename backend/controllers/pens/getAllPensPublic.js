const db = require("../../config/db");

async function getAllPensPublic(req, res) {
    try {
        db.query(
            `
            SELECT p.*, a.avatar, a.username, COUNT(l.id_project) AS total_likes
            FROM pens p
            JOIN account a ON p.email = a.email
            LEFT JOIN likes l ON p.id = l.id_project
            GROUP BY p.id
        `,
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    success: true,
                    message: "Get all pens public successfully",
                    data: result,
                });
            }
        );
    } catch (err) {
        res.json({
            message: err.message,
            success: false,
        });
    }
}

module.exports = getAllPensPublic;
