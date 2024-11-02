const db = require("../../config/db");

async function countFollower(req, res) {
    try {
        const { userId } = req.params;

        const followerCount = await new Promise((resolve, reject) => {
            db.query(
                `SELECT COUNT(*) AS followerCount FROM follower WHERE followerId = ?`,
                [userId],
                function (err, result) {
                    if (err) return reject(err);
                    resolve(result[0].followerCount);
                }
            );
        });

        const followingCount = await new Promise((resolve, reject) => {
            db.query(
                `SELECT COUNT(*) AS followingCount FROM follower WHERE followingId = ?`,
                [userId],
                function (err, result) {
                    if (err) return reject(err);
                    resolve(result[0].followingCount);
                }
            );
        });

        return res.json({
            success: true,
            message: "Get count successfully",
            data: {
                followerCount: followerCount,
                followingCount: followingCount,
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
}

module.exports = countFollower;
