const db = require("../../config/db");

async function sortDescLike(req, res) {
	try {
		db.query(
			`
            SELECT p.*, COUNT(l.id_project) AS total_likes
            FROM pens p
            LEFT JOIN likes l ON p.id = l.id_project
            GROUP BY p.id
            ORDER BY total_likes DESC
        `,
			function (err, result) {
				if (err) {
					console.log("Error from get all like by user", err);
					return res.status(200).json({
						success: true,
						message: err,
					});
				}
				return res.status(200).json({
					success: true,
					data: result,
				});
			}
		);
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = sortDescLike;
