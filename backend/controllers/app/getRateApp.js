const db = require("../../config/db");

async function getRateApp(req, res) {
	try {
		db.query(
			"SELECT * FROM rate r JOIN account a ON r.user_id = a.id",
			function (err, result) {
				if (err) {
					console.log(err);
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "Rate successfully",
					data: result,
				});
			}
		);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getRateApp;
