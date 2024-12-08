const db = require("../../config/db")

async function getFollower(req, res) {
    try {
        const { followingId } =  req.params
        
        db.query('SELECT * FROM follower WHERE followerId = ? AND followingId = ?',
            [req.userId, followingId],
            function(err, result) {
                if (err) {
                    throw err;
                }

                if (result.length > 0) {
                    return res.json({
                        success: true,
                        message: "Follower found",
                        isFollowing: true
                    })
                } else {
                    return res.json({
                        success: true,
                        message: "Follower not found",
                        isFollowing: false
                    })
                }

            }
        )
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }
}

module.exports = getFollower;