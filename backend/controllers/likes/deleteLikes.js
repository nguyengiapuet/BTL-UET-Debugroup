const db = require("../../config/db");

async function deleteLikes(req, res) {
	try {
		console.log("idProject>>>>>>>>>>>>>>", req.body);
		const { idProject } = req.body;

		db.query(
			"DELETE FROM likes WHERE id_user = ? AND id_project = ?",
			[req.userId, idProject],
			function (err, result) {
				if (err) {
					console.log("Error from delete like", err);
					return res.status(200).json({
						success: true,
						message: err,
					});
				}
				res.status(200).json({
					success: true,
					message: "Unlike successfully",
				});
			}
		);
	} catch (err) {
		res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = deleteLikes;
