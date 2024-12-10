const db = require("../../config/db");

async function getDetailsUser(req, res) {
	try {
		db.query(
			"SELECT id, username, email, role, created_at, avatar FROM account WHERE id = ?",
			[req.userId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}

				res.json({
					success: true,
					message: "User details fetched successfully",
					user: result[0],
				});
			}
		);
	} catch (err) {
		return res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getDetailsUser;
