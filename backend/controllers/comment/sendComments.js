const db = require("../../config/db")

async function sendComments(req, res) {
    try {
        const { idProject, content } = req.body;
        db.query('INSERT INTO comments (id_user, id_project, content) VALUES (?, ?, ?)', [req.userId, idProject, content],
            function(err, result) {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    success: true,
                    message: "Comments successfully"
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports = sendComments;