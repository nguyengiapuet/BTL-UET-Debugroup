const db = require("../../config/db");

async function getAllPensUser(req, res) {
	try {
		console.log(req.body);

		db.query(
			`
            SELECT p.*, a.avatar, a.username, COUNT(l.id_project) AS total_likes
            FROM pens p
            JOIN account a ON p.email = a.email
            LEFT JOIN likes l ON p.id = l.id_project
            WHERE a.username = ? AND p.is_delete = 0
            GROUP BY p.id
        `,
			[req.body.username],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					message: "Pens fetched successfully",
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

module.exports = getAllPensUser;
