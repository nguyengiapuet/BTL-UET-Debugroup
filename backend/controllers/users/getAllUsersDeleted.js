const db = require("../../config/db");

async function getAllUsersDeleted(req, res) {
	try {
		db.query(
			"SELECT * FROM account WHERE deleted = ?",
			[1],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					message: "Users fetched successfully",
					data: result,
				});
			}
		);
	} catch (err) {
		res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getAllUsersDeleted;
