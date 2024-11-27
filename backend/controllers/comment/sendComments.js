const db = require("../../config/db");

async function sendComments(req, res) {
	const connection = await db.promise().getConnection();
	try {
		const { idProject, content } = req.body;

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
			"INSERT INTO comments (id_user, id_project, content) VALUES (?, ?, ?)",
			[req.userId, idProject, content]
		);

		if (req.userId !== recipientId) {
			await connection.query(
				"INSERT INTO notification (issuerId, recipientId,postId, type) VALUES (?, ?, ?, ?)",
				[req.userId, recipientId, idProject, "COMMENT"]
			);
		}

		await connection.commit();

		return res.json({
			success: true,
			message: "Comment successfully",
		});
	} catch (err) {
		await connection.rollback();

		console.error("Error creating comment:", err);
		return res.status(500).json({
			success: false,
			message: "An error occurred while processing your request.",
		});
	} finally {
		connection.release();
	}
}

module.exports = sendComments;
