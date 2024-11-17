const db = require("../../config/db");

async function editCommentByUser(req, res) {
	try {
		const { idComment, content } = req.body;

		console.log(idComment, req.userId);

		db.query(
			"UPDATE comments SET content = ? WHERE id = ? AND id_user = ?",
			[content, idComment, req.userId],
			function (err, result) {
				if (err) {
					throw err;
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
