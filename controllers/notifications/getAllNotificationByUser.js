const db = require("../../config/db");

async function getAllNotificationByUser(req, res) {
	try {
		db.query(
			`SELECT 
                notification.*,
                account.username AS issuerUsername,
                account.avatar AS issuerAvatar,
                pens.title AS postTitle
            FROM 
                notification
            LEFT JOIN 
                account ON notification.issuerId = account.id
            LEFT JOIN 
                pens ON notification.postId = pens.id
            WHERE 
                notification.recipientId = ?
			ORDER BY notification.created_at DESC
				`,
			[req.userId],
			function (err, result) {
				if (err) {
					throw err;
				}
				res.status(200).json({
					success: true,
					message: "Successfully",
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

module.exports = getAllNotificationByUser;
