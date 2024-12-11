const db = require("../../config/db");

async function RestoreUser(req, res) {
	console.log("(req.body)", req.body);

	try {
		db.query(
			"UPDATE account SET deleted=?, deletedAt=? WHERE id = ?",
			[0, null, req.params.id],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "User restore successfully",
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

module.exports = RestoreUser;
