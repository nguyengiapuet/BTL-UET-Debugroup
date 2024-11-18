const db = require("../../config/db");

async function addLikes(req, res) {
	try {
		const { idProject } = req.body;
		db.query(
			"INSERT INTO likes (id_user, id_project) VALUES (?, ?)",
			[req.userId, idProject],
			function (err, result) {
				if (err) {
					throw err;
				}
				res.status(200).json({
					success: true,
					message: "Like successfully",
				});
			}
		);
	} catch (err) {
		res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = addLikes;
