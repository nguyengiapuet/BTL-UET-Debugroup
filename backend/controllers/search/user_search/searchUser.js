const db = require("../../../config/db");

async function searchUser(req, res) {
	try {
		db.query(
			"SELECT * FROM account WHERE LOWER(username) LIKE LOWER(?) AND deleted = 0",
			[`%${req.params.username}%`],
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

module.exports = searchUser;
