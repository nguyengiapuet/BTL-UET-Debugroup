const db = require("../../config/db");
//create Pens
async function createPens(req, res) {
	try {
		const { html, css, js, output, title, status } = req.body;
		db.query(
			"INSERT INTO pens (title, email, html, css, js, output, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[title, req.email, html, css, js, output, status],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}

				return res.json({
					success: true,
					message: "Save pens successfully",
				});
			}
		);
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Error creating pen",
		});
	}
}

module.exports = createPens;
