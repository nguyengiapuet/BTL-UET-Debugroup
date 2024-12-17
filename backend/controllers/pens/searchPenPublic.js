const db = require("../../config/db");

async function searchPenPublic(req, res) {
	const query = req.body.query;
	console.log("test query", query);
	try {
		const sql = `
        SELECT p.*, a.avatar, a.username, a.id AS userId, COUNT(distinct l.id) AS total_likes, COUNT(distinct c.id) AS total_comments
         FROM pens p
         JOIN account a ON p.email = a.email
         LEFT JOIN likes l ON p.id = l.id_project
         LEFT JOIN comments c ON p.id = c.id_project
         WHERE p.status = 'public' AND p.is_delete = 0 AND LOWER(p.title) LIKE ?
         GROUP BY p.id
     `;

		const formattedQuery = `%${query}%`;
		console.log("Executing SQL:", sql, "with value:", formattedQuery); // Log the SQL and the value

		db.query(sql, [formattedQuery], function (err, result) {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: err.message,
					success: false,
				});
			}
			console.log("Data: ", result); // Log the result
			return res.status(200).json({
				success: true,
				message: "Get successfully",
				data: result,
			});
		});
	} catch (err) {
		return res.json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = searchPenPublic;
