const db = require("../../config/db");

async function totalLikePen(req, res) {
	try {
		db.query(
			`SELECT id_project, COUNT(*) AS total_likes
            FROM likes
            WHERE id_project = ?`,
			[req.params.penId],
			function (err, result) {
				if (err) {
					throw err;
				}

				res.status(200).json({
					success: true,
					data: result[0].total_likes,
				});
			}
		);
	} catch (err) {
		res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = totalLikePen;
