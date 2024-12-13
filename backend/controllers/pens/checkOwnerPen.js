const db = require("../../config/db");

async function checkOwnerPen(req, res) {
	try {
		const { user_email, project_id } = req.body;
		db.query(
			"SELECT p.title FROM pens P WHERE p.email = ? AND p.id = ?",
			[user_email, project_id],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				console.log("Test a9999", result);
				if (result.length === 0) {
					return res.json({
						success: true,
						message: "Non owner",
						data: false,
					});
				}

				return res.json({
					success: true,
					message: "Owner",
					data: true,
				});
			}
		);
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Error creating pen",
		});
	}
}

module.exports = checkOwnerPen;
