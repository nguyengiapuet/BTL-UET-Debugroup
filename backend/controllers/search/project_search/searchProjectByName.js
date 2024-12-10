const db = require("../../../config/db");

async function searchProjectByName(req, res) {
	console.log("req.params.pr0ject-name", req.params.projectname);

	try {
		db.query(
			`
			SELECT p.*, a.avatar, a.username, COUNT(distinct l.id) AS total_likes, COUNT(distinct c.id) AS total_comments
		    FROM pens p
		    JOIN account a ON p.email = a.email
		    LEFT JOIN likes l ON p.id = l.id_project
		    LEFT JOIN comments c ON p.id = c.id_project
			WHERE LOWER(p.title) LIKE LOWER(?) AND p.is_delete = 0
            GROUP BY p.id
			`,
			[`%${req.params.projectname}%`],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
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

module.exports = searchProjectByName;
