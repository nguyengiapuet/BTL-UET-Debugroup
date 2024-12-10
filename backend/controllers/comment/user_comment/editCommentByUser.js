const db = require("../../../config/db");

async function editCommentByUser(req, res) {
	try {
		const { idComment, content, timeNow } = req.body;

		console.log(idComment, req.userId);

		db.query(
			"UPDATE comments SET content = ?, update_at = ? WHERE id = ? AND id_user = ?",
			[content, timeNow, idComment, req.userId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					message: "Edit comment successfully",
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

module.exports = editCommentByUser;
