const db = require("../../config/db")

async function findUserByUsername(req, res) {
    try {
        db.query('SELECT id, username, email, role, created_at, avatar FROM account WHERE username = ?', [req.params.username],
            function(err, result) {
               
                return res.json({
                    success: true,
                    message: "User found successfully",
                    data: result[0]
                })
            }
        )
    } catch(err) {
        res.json({
            success: false,
            message: err.message,
        })
    }
}

module.exports = findUserByUsername;