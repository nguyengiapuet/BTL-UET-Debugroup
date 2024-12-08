const db = require("../../config/db");
const bcrypt = require("bcryptjs");

async function changePassword(req, res) {
	const { password } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = await bcrypt.hashSync(password, salt);
	try {
		db.query(
			"UPDATE account SET password = ? WHERE id = ?",
			[hashPassword, req.userId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					message: "Change password successfully",
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

module.exports = changePassword;
