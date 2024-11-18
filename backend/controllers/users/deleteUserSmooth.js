const db = require("../../config/db");

async function deleteUserSmooth(req, res) {
	console.log("(req.body)", req.body);

	try {
		db.query(
			"UPDATE account SET deleted=?, deletedAt=? WHERE id = ?",
			[1, req.body.timeNow, req.params.id],
			function (err, result) {
				if (err) throw err;
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

module.exports = deleteUserSmooth;
