const db = require("../../config/db");

async function deletedUser(req, res) {
	try {
		db.query(
			"UPDATE account SET deleted = 1 WHERE id = ?",
			[req.params.id],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "User deleted successfully",
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

module.exports = deletedUser;
