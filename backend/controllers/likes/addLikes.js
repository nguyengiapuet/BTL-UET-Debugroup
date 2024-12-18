const db = require("../../config/db");

async function addLikes(req, res) {
	const connection = await db.promise().getConnection();
	try {
		const { idProject } = req.body;

		if (!idProject) {
			return res.status(400).json({
				success: false,
				message: "Project ID is required",
			});
		}

		await connection.beginTransaction();

		const [email] = await connection.query(
			"SELECT email FROM pens WHERE id = ?",
			[idProject]
		);

		if (email.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Project not found",
			});
		}

		const [rows] = await connection.query(
			"SELECT id FROM account WHERE email = ?",
			[email[0].email]
		);

		const recipientId = rows[0].id;

		await connection.query(
			"INSERT INTO likes (id_user, id_project) VALUES (?, ?)",
			[req.userId, idProject]
		);

		if (req.userId !== recipientId) {
			await connection.query(
				"INSERT INTO notification (issuerId, recipientId,postId, type) VALUES (?, ?, ?, ?)",
				[req.userId, recipientId, idProject, "LIKE"]
			);

			// // Gửi thông báo qua socket.io
			// req.io.to(`user-${recipientId}`).emit("notification", {
			// 	issuerId: req.userId,
			// 	recipientId,
			// 	postId: idProject,
			// 	type: "LIKE",
			// });
		}

		await connection.commit();

		return res.json({
			success: true,
			message: "Like successfully",
			data: recipientId,
		});
	} catch (err) {
		await connection.rollback();

		console.error("Error creating like:", err);
		return res.status(500).json({
			success: false,
			message: "An error occurred while processing your request.",
		});
	} finally {
		connection.release();
	}
}

module.exports = addLikes;
