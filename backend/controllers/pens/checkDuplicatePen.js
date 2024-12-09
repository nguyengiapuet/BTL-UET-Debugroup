const db = require("../../config/db");

async function checkDuplicatePen(req, res) {
	try {
		const { title } = req.body;
		db.query(
			"SELECT p.title FROM pens P WHERE p.title = ? AND p.email = ?",
			[title, req.email],
			function (err, result) {
				if (err) {
					throw err;
				}
				console.log("Test a9999", result);
				if (result.length === 0) {
					return res.json({
						success: true,
						message: "Non Duplicated",
					});
				}
				return res.json({
					success: true,
					message: "Duplicated",
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

module.exports = checkDuplicatePen;
