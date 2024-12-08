const db = require("../../config/db");

async function restorePen(req, res) {
	try {
		db.query(
			"UPDATE pens p SET p.is_delete = 0 WHERE p.id = ?",
			[req.params.id],
			function (err, result) {
				if (err) {
					return res.json({
						success: false,
						message: err.message,
					});
				}

				res.json({
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

module.exports = restorePen;
