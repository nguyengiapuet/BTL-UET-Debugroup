const db = require("../../config/db");

async function getAllUsers(req, res) {
	try {
		const query = () => {
			return new Promise((resolve, reject) => {
				db.query(
					"SELECT * FROM account WHERE deleted = ?",
					[0],
					(err, result) => {
						if (err) reject(err);
						resolve(result);
					}
				);
			});
		};

		const result = await query();

		const safeResult = result.map((row) => ({
			...row,
			id: row.id?.toString(),
			created_at:
				row.created_at instanceof Date
					? row.created_at.toISOString()
					: row.created_at,
		}));

		return res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			data: safeResult,
		});
	} catch (err) {
		console.error("Error:", err);
		return res.status(500).json({
			success: false,
			message: "Error fetching users",
			error: err.message,
		});
	}
}

module.exports = getAllUsers;
