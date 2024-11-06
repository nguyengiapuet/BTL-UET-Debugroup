try {
    const db = require('../../config/db');
} catch (e) {
    console.log(e);
}

async function getAllUsers(req, res) {
    try {
        db.query('SELECT * FROM account', function (err, result) {
            console.log(result);
            res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: result,
            });
        });
    } catch (err) {
        res.json({
            message: err.message,
            success: false,
        });
    }
}

module.exports = getAllUsers;
