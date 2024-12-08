const db = require("../../config/db");
const bcrypt = require("bcryptjs");

async function checkPasswordUser(req, res) {
	try {
		const user = await db
			.promise()
			.query("SELECT * FROM account WHERE email = ? AND deleted=?", [
				req.email,
				0,
			]);
		const checkPassword = await bcrypt.compare(
			req.body.password,
			user[0][0].password
		);

		if (!checkPassword) {
			return res.json({
				success: false,
				message: "Incorrect password",
			});
		}

		return res.json({
			success: true,
			message: "Password validated",
		});
	} catch (err) {
		return res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = checkPasswordUser;
