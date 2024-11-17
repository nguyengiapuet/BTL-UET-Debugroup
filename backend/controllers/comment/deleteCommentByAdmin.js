const db = require("../../config/db");

async function deleteCommentByAdmin(req, res) {
	try {
		const { idComment } = req.body;

		db.query(
			"DELETE FROM comments WHERE id = ?",
			[idComment],
			function (err, result) {
				if (err) {
					throw err;
				}
				res.status(200).json({
					success: true,
					message: "Remove comment successfully",
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

module.exports = deleteCommentByAdmin;
