const db = require("../../config/db");

async function getAllCommentsByProject(req, res) {
	try {
		db.query(
			`
                SELECT 
                    comments.id,
                    comments.content, 
                    comments.id_user, 
                    account.username, 
                    account.email,
                    account.avatar
                FROM 
                    comments 
                JOIN 
                    account ON comments.id_user = account.id 
                WHERE 
                    comments.id_project = ?;
            `,
			[req.params.id],
			function (err, result) {
				if (err) {
					throw err;
				}
				res.status(200).json({
					success: true,
					message: "get all comments successfully",
					data: result,
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

module.exports = getAllCommentsByProject;
