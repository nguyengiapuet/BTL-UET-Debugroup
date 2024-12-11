const db = require("../../config/db");

async function deletePenForever(req, res) {
	try {
		db.query(
			"DELETE FROM pens WHERE id = ?",
			[req.params.id],
			function (err, result) {
				if (err) {
					return res.json({
						success: false,
						message: err.message,
					});
				}

				return res.json({
					success: true,
					message: "Deleted successfully",
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

module.exports = deletePenForever;
