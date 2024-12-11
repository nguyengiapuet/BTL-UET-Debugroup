const db = require("../../../config/db");

async function deleteCommentByAdmin(req, res) {
	try {
		const { idComment } = req.body;

		db.query(
			"UPDATE comments SET is_delete = 1 WHERE id = ?",
			[idComment],
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

module.exports = deleteCommentByAdmin;
