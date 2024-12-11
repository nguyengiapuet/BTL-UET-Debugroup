const db = require("../../config/db");

async function getAllLikeByUser(req, res) {
	try {
		db.query(
			"SELECT id_project FROM likes WHERE id_user = ?",
			[req.userId],
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
					message: "get all likes by user successfully",
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

module.exports = getAllLikeByUser;
