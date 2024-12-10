const db = require("../../config/db");

async function countNotificationUnread(req, res) {
	try {
		db.query(
			`SELECT COUNT(*) AS total_notification
            FROM notification WHERE recipientId = ? AND isRead = ?
            `,
			[req.userId, 0],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				res.status(200).json({
					success: true,
					data: result[0].total_notification,
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

module.exports = countNotificationUnread;
