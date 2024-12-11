const db = require("../../config/db");

async function updatePen(req, res) {
	const { html, css, js, output, title, status } = req.body;
	try {
		db.query(
			"UPDATE pens SET html = ?, css =?, js =?, output= ?, title =?, status =? WHERE id = ?",
			[html, css, js, output, title, status, req.params.id],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "Update pen successfully",
					data: result,
				});
			}
		);
	} catch (err) {
		return res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = updatePen;
