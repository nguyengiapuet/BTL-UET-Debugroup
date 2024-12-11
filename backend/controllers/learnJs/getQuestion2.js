const db = require("../../config/db");

async function getQuestion2(req, res) {
	try {
		db.query("SELECT * FROM practices", function (err, result) {
			if (err) {
				console.log(err);
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
		console.log(err);

		res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = getQuestion2;
