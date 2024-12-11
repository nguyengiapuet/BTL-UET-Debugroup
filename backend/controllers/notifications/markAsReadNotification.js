const db = require("../../config/db");

async function markAsReadNotification(req, res) {
	try {
		db.query(
			`UPDATE notification SET  isRead = ? WHERE recipientId = ?
            `,
			[1, req.userId],
			function (err, result) {
				if (err) {
					return res.status(500).json({
						message: err.message,
						success: false,
					});
				}
				return res.status(200).json({
					success: true,
					message: "Notification marked as read",
				});
			}
		);
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			success: false,
		});
	}
}

module.exports = markAsReadNotification;
