const db = require("../../config/db");

async function getDeletedPen(req, res) {
	try {
		db.query(
			`
		   SELECT p.*, a.avatar, a.username, COUNT(distinct l.id) AS total_likes, COUNT(distinct c.id) AS total_comments
		    FROM pens p
		    JOIN account a ON p.email = a.email
		    LEFT JOIN likes l ON p.id = l.id_project
		    LEFT JOIN comments c ON p.id = c.id_project
			WHERE p.is_delete = 1
		    GROUP BY p.id
		`,
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "Get successfully",
					data: result,
				});
			}
		);
		console.log("Get successfully");
	} catch (err) {
		return res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getDeletedPen;
