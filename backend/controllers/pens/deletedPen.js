const db = require("../../config/db");

async function deletedPen(req, res) {
	try {
		db.query(
			"UPDATE pens p SET p.is_delete = 1 WHERE p.id = ?",
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

module.exports = deletedPen;
