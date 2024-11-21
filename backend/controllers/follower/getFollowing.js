const db = require("../../config/db");

async function getFollowing(req, res) {
	try {
		db.query(
			`SELECT a.*
			FROM account a
			JOIN follower f ON a.id = f.followingId
			WHERE f.followerId = ?`,
			[req.userId],
			function (err, result) {
				if (err) {
					throw err;
				}

				return res.json({
					success: true,
					message: "Following found successfully",
					data: result,
				});
			}
		);
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Error",
		});
	}
}

module.exports = getFollowing;
