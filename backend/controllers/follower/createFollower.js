const db = require("../../config/db")

async function createFollower(req, res) {
    try {
        const { followingId } =  req.body
        
        db.query('INSERT INTO follower (followerId, followingId) VALUES (?, ?)',
            [req.userId, followingId],
            function(err, result) {
                if (err) {
                    throw err;
                }

                return res.json({
                    success: true,
                    message: 'Follow successfully'
                })
            }
        )
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }
}

module.exports = createFollower;