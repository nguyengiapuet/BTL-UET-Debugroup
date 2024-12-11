const db = require("../../config/db");

async function checkDuplicatePen(req, res) {
	try {
		const { title } = req.body;
		db.query(
			"SELECT p.title, p.is_delete FROM pens P WHERE p.title = ? AND p.email = ?",
			[title, req.email],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				console.log("Test a9999", result);
				// Trùng tên với project đã xoá, vui lòng liên hệ admin khôi phục hoặc xoá
				if (result.length !== 0 && result[0].is_delete === 0) {
					return res.json({
						success: true,
						message: "Duplicated",
					});
				}
				if (result.length !== 0 && result[0].is_delete === 1) {
					return res.json({
						success: true,
						message: "delete_dup",
					});
				}

				return res.json({
					success: true,
					message: "Non Duplicated",
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
