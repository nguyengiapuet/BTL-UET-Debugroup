const db = require("../../config/db");

async function deleteCommentByUser(req, res) {
	try {
		const { idComment } = req.body;

		console.log(idComment, req.userId);

		db.query(
			"DELETE FROM comments WHERE id = ? AND id_user = ?",
			[idComment, req.userId],
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

module.exports = deleteCommentByUser;
