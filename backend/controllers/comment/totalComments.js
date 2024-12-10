const db = require("../../config/db");

async function totalComments(req, res) {
	try {
		db.query(
			`SELECT pens.id, COUNT(comments.id) AS total_comments
             FROM pens
             LEFT JOIN comments ON pens.id = comments.id_project
             GROUP BY pens.id`,
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					data: result,
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

module.exports = totalComments;
