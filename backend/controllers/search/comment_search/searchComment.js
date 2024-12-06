const db = require("../../../config/db");

async function searchComment(req, res) {
	console.log("req.params", req.params.comment);

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
                WHERE LOWER(comments.content) LIKE LOWER(?) AND comments.is_delete = 0
            `,
			[`%${req.params.comment}%`],
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

module.exports = searchComment;