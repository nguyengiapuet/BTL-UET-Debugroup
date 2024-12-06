const db = require("../../../config/db");

async function searchDeletedUser(req, res) {
	console.log("req.params.username", req.params.username);

	try {
		db.query(
			"SELECT * FROM account WHERE LOWER(username) LIKE LOWER(?) AND deleted = 1",
			[`%${req.params.username}%`],
			function (err, result) {
				console.log(result);
				res.status(200).json({
					success: true,
					message: "Users fetched successfully",
					data: result,
				});
			}
		);
	} catch (err) {
		res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = searchDeletedUser;