const db = require("../../config/db");

async function createFollower(req, res) {
	const connection = await db.promise().getConnection();
	try {
		const { followingId } = req.body;

		if (!followingId) {
			return res.status(400).json({
				success: false,
				message: "Following ID is required",
			});
		}

		await connection.beginTransaction();

		await connection.query(
			"INSERT INTO follower (followerId, followingId) VALUES (?, ?)",
			[req.userId, followingId]
		);

		await connection.query(
			"INSERT INTO notification (issuerId, recipientId, type) VALUES (?, ?, ?)",
			[req.userId, followingId, "FOLLOW"]
		);

		await connection.commit();

		return res.json({
			success: true,
			message: "Follow successfully",
		});
	} catch (err) {
		await connection.rollback();

		console.error("Error creating follower:", err);
		return res.status(500).json({
			success: false,
			message: "An error occurred while processing your request.",
		});
	} finally {
		connection.release();
	}
}

module.exports = createFollower;
