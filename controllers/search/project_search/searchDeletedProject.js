const db = require("../../../config/db");

async function searchDeletedProject(req, res) {
	console.log("req.params.projectname", req.params.projectname);

	try {
		db.query(
			`
			SELECT p.*, a.avatar, a.username, COUNT(distinct l.id) AS total_likes, COUNT(distinct c.id) AS total_comments
		    FROM pens p
		    JOIN account a ON p.email = a.email
		    LEFT JOIN likes l ON p.id = l.id_project
		    LEFT JOIN comments c ON p.id = c.id_project
            WHERE LOWER(p.title) LIKE LOWER(?) AND p.is_delete = 1
            GROUP BY p.id
			`,
			[`%${req.params.projectname}%`],
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

module.exports = searchDeletedProject;
