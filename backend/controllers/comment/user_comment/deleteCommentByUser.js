const db = require("../../../config/db");

async function deleteCommentByUser(req, res) {
	try {
		const { idComment } = req.body;

		db.query(
			"DELETE FROM comments WHERE id = ? AND id_user = ?",
			[idComment, req.userId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "Remove comment successfully",
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

module.exports = deleteCommentByUser;
