const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function signInAccount(req, res) {
	try {
		const { email, password } = req.body;

		if (email === "") {
			return res.json({
				success: false,
				message: "Email is required",
			});
		}

		if (password === "") {
			return res.json({
				success: false,
				message: "Password is required",
			});
		}

		console.log(req.body);

		const user = await db
			.promise()
			.query("SELECT * FROM account WHERE email = ? AND deleted=?", [
				email,
				0,
			]);
		console.log("user[0]", user[0]);

		if (user[0].length === 0) {
			return res.json({
				success: false,
				message: "Email or password incorrect",
			});
		}

		// console.log(user[0][password]);

		const checkPassword = await bcrypt.compare(
			password,
			user[0][0].password
		);
		console.log(checkPassword);

		if (!checkPassword) {
			return res.json({
				success: false,
				message: "Email or password incorrect",
			});
		}

		const tokenData = {
			id: user[0][0].id,
			email: email,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);

		return res.json({
			success: true,
			message: "Log in successfully",
			accessToken: token,
		});
	} catch (err) {
		res.status(404).json({
			success: false,
			message: err.message,
		});
	}
}

module.exports = signInAccount;
