const db = require("../../config/db")

async function getAllLikeByUser(req, res) {
    try {
        db.query('SELECT id_project FROM likes WHERE id_user = ?',[req.userId],
            function(err, result) {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    success: true,
                    message: "get all likes by user successfully",
                    data: result
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

module.exports = getAllLikeByUser;