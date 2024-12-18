const db = require("../../config/db");

async function sendRateApp(req, res) {
	const { id, content, number_star } = req.body;
	try {
		db.query(
			"INSERT INTO rate(user_id, content, number_star) VALUES (?, ?, ?)",
			[id, content, number_star],
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

module.exports = sendRateApp;
