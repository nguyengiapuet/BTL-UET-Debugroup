const db = require("../../config/db");

async function getUpvotePen(req, res) {
	try {
		db.query(
			`
		    SELECT p.*, a.avatar, a.username, COUNT(distinct l.id) AS total_likes, COUNT(distinct c.id) AS total_comments
		    FROM likes l
            JOIN pens p ON l.id_project = p.id
            JOIN account a ON l.id_user = a.id
            LEFT JOIN comments c ON c.id_project = p.id
            WHERE l.id_user = a.id and a.id = ?
            GROUP BY p.id, a.id
		`, [req.params.userid],
			function (err, result) {
				if (err) {
					console.log(err);
				}
				res.status(200).json({
					success: true,
					message: "Get successfully",
					data: result,
				});
			}
		);
		console.log("Get successfully");
	} catch (err) {
		res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getUpvotePen;
