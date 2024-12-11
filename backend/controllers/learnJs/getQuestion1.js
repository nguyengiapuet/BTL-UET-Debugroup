const db = require("../../config/db");

async function getQuestion1(req, res) {
	try {
		db.query("SELECT * FROM multi_choice", function (err, result) {
			if (err) {
				return res.status(500).json({
					message: err.message,
					success: false,
				});
			}
			res.status(200).json({
				success: true,
				message: "get all likes by user successfully",
				data: result,
			});
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getQuestion1;
