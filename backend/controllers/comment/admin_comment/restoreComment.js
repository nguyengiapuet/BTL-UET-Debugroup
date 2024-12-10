const db = require("../../../config/db");

async function restoreComment(req, res) {
	try {
		const { idComment } = req.body;

		db.query(
			"UPDATE comments SET is_delete = 0 WHERE id = ?",
			[idComment],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					message: "Restore comment successfully",
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

module.exports = restoreComment;
