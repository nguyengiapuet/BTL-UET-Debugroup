const db = require('../../config/db');
//create Pens
async function createPens(req, res) {
    try {
        const { html, css, js, output, title } = req.body;
        db.query(
            'INSERT INTO pens (title, email, html, css, js, output) VALUES (?, ?, ?, ?, ?, ?)',
            [title, req.email, html, css, js, output],
            function (err, result) {
                if (err) {
                    throw err;
                }

                return res.json({
                    success: true,
                    message: 'Save pens successfully',
                });
            },
        );
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating pen',
        });
    }
}

module.exports = createPens;
