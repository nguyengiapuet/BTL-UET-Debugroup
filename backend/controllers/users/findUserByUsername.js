const db = require("../../config/db");

async function findUserByUsername(req, res) {
	try {
		db.query(
			"SELECT id, username, email, role, created_at, avatar FROM account WHERE username = ?",
			[req.params.username],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.json({
					success: true,
					message: "User found successfully",
					data: result[0],
				});
			}
		);
	} catch (err) {
		res.json({
			success: false,
			message: err.message,
		});
	}
}

module.exports = findUserByUsername;
