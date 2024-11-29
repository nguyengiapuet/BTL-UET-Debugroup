const db = require("../../config/db");

async function markAsReadNotification(req, res) {
	try {
		db.query(
			`UPDATE notification SET  isRead = ? WHERE recipientId = ?
            `,
			[1, req.userId],
			function (err, result) {
				if (err) {
					throw err;
				}
				res.status(200).json({
					success: true,
					message: "Notification marked as read",
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

module.exports = markAsReadNotification;
