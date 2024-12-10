const db = require("../../config/db");

async function getListFollowingUser(req, res) {
	try {
		const id = await new Promise((resolve, reject) => {
			db.query(
				`SELECT id
            FROM account
            WHERE username =?`,
				[req.params.username],
				(err, result) => {
					if (err) {
						reject(err);
					}
					resolve(result[0].id);
				}
			);
		});

		db.query(
			`SELECT a.*
			FROM account a
			JOIN follower f ON a.id = f.followerId
			WHERE f.followingId = ?`,
			[id],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
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

module.exports = getListFollowingUser;
