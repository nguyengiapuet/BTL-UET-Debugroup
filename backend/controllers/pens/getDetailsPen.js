const db = require("../../config/db")

async function getDetailsPen(req, res) {
    try {
        db.query('SELECT title, html, css, js, output FROM pens WHERE id = ?', [req.params.id],
            function(err, result) {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    })
                }

                res.json({
                    success: true,
                    data: result[0],
                    message: 'successfully'
                })
            }
        )
    } catch (err) {
        return res.json({
            message: err.message,
            success: false
        })
    }
} 

module.exports = getDetailsPen