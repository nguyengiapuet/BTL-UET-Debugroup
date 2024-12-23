const db = require("../../config/db");

async function deleteFollower(req, res) {
	try {
		const { followingId } = req.params;

		db.query(
			"DELETE FROM follower WHERE followerId = ? AND followingId = ?",
			[req.userId, followingId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}

				return res.json({
					success: true,
					message: "UnFollow successfully",
				});
			}
		);
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Error",
		});
	}
}

module.exports = deleteFollower;
