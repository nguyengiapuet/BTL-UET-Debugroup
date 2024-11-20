const db = require("../../config/db");

async function getAllComments(req, res) {
	try {
		db.query(
			`
                SELECT 
                    comments.id,
                    comments.content, 
                    comments.id_user,
					comments.comments_at,
					comments.update_at,
                    account.username, 
                    account.email,
                    account.avatar,
                    pens.title
                FROM 
                    comments 
                JOIN 
                    account ON comments.id_user = account.id 
                JOIN
                    pens ON comments.id_project = pens.id
            `,
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

module.exports = getAllComments;
