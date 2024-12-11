const db = require("../../config/db");

async function totalCommentPen(req, res) {
	try {
		db.query(
			`SELECT id_project, COUNT(*) AS total_comments
            FROM comments
            WHERE id_project = ?`,
			[req.params.penId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}

				return res.status(200).json({
					success: true,
					data: result[0].total_comments,
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

module.exports = totalCommentPen;
