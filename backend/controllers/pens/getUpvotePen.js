const db = require("../../config/db");

async function getUpvotePen(req, res) {
	try {
		db.query(
			`
		    SELECT p.*, a.avatar, a.username, COUNT(l.id_project) AS total_likes
            FROM pens p
            JOIN account a ON p.email = a.email
            LEFT JOIN likes l ON p.id = l.id_project
            WHERE p.is_delete = 0 AND l.id_user = ?
            GROUP BY p.id
		`,
			[req.userId],
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
