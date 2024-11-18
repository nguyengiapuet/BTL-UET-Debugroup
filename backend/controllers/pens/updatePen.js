const db = require('../../config/db');
//undatePen

async function updatePen(req, res) {
    const { html, css, js, output, title } = req.body;
    try {
        db.query(
            'UPDATE pens SET html = ?, css =?, js =?, output= ?, title =? WHERE id = ?',
            [html, css, js, output, title, req.params.id],
            function (err, result) {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                        success: false,
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Pens fetched successfully',
                    data: result,
                });
            },
        );
        //
    } catch (err) {
        res.json({
            message: err.message,
            success: false,
        });
    }
}

module.exports = updatePen;
