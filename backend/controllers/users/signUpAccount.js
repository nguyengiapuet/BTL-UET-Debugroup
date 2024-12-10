const db = require("../../config/db");
const bcrypt = require("bcryptjs");

async function signUpAccount(req, res) {
	try {
		const { username, email, password, avatar } = req.body;

		const name = await db
			.promise()
			.query("SELECT * FROM account WHERE username = ?", [username]);

		if (name[0].length > 0) {
			return res.json({
				success: false,
				message: "Username already exists",
			});
		}

		const isDotCom = (str) => str.endsWith(".com");

		if (!isDotCom(email)) {
			return res.json({
				success: false,
				message:
					"Please enter a valid email address (e.g., ex@abc.com)",
			});
		}

		const e = await db
			.promise()
			.query("SELECT * FROM account WHERE email = ?", [email]);

		console.log("user>>>>>>>>>", e);

		if (e[0].length > 0) {
			return res.json({
				success: false,
				message: "Email already exists",
			});
		}

		if (password.length < 6) {
			return res.json({
				success: false,
				message: "Password should be at least 6 characters long",
			});
		}

		const salt = bcrypt.genSaltSync(10);
		const hashPassword = await bcrypt.hashSync(password, salt);

		const payload = {
			...req.body,
			password: hashPassword,
			role: "user",
		};

		console.log(payload);

		db.query(
			`INSERT INTO account (username, email, password, role, avatar) VALUES (?, ?, ?, ?, ?)`,
			[username, email, hashPassword, "user", avatar],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.json({
					success: true,
					message: "Account created successfully",
					data: result,
				});
			}
		);
	} catch (err) {
		res.status(401).json({
			success: false,
			message: err.message,
		});
	}
}

module.exports = signUpAccount;
