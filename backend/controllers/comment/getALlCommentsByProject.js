const db = require("../../config/db");

async function getAllCommentsByProject(req, res) {
	try {
		console.log("req.params.id", req.params.id);

		db.query(
			`
                SELECT 
                    comments.id,
                    comments.content, 
                    comments.id_user, 
					comments.comments_at,
                    account.username, 
                    account.email,
                    account.avatar
                FROM 
                    comments 
                JOIN 
                    account ON comments.id_user = account.id 
                WHERE 
                    comments.id_project = ?
				ORDER BY 
                    comments.comments_at DESC;
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
