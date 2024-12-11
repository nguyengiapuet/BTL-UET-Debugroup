const db = require("../../config/db");

async function updateInfoUser(req, res) {
	const { username, avatar } = req.body;
	try {
		db.query(
			"UPDATE account SET username = ?, avatar =? WHERE id = ?",
			[username, avatar, req.params.id],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "Pens fetched successfully",
					data: result,
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

module.exports = updateInfoUser;
