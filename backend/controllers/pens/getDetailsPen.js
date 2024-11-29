const db = require("../../config/db");

async function getDetailsPen(req, res) {
	try {
		db.query(
			`SELECT 
                pens.id,
                pens.title,
                pens.html,
                pens.css,
                pens.js,
                pens.output,
                pens.email,
                account.username,
				account.avatar
            FROM 
                pens
            LEFT JOIN 
                account ON pens.email = account.email
            WHERE 
                pens.id = ?`,
			[req.params.id],
			function (err, result) {
				if (err) {
					return res.json({
						success: false,
						message: err.message,
					});
				}

				res.json({
					success: true,
					data: result[0],
					message: "successfully",
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

module.exports = getDetailsPen;
