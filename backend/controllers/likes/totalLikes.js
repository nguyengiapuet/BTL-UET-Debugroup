const db = require("../../config/db");

async function totalLike(req, res) {
	try {
		db.query(
			`SELECT id_project, COUNT(*) AS total_likes
            FROM likes
            GROUP BY id_project`,
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

module.exports = totalLike;
