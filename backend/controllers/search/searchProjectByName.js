const db = require("../../config/db");

async function searchProjectByName(req, res) {
	console.log("req.params.pr0ject-name", req.params.projectname);

	try {
		db.query(
			"SELECT * FROM pens WHERE title LIKE ?",
			[`%${req.params.projectname}%`],
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

module.exports = searchProjectByName;
