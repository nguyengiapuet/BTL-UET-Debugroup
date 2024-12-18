const jwt = require('jsonwebtoken')
const TOKEN_SECRET_KEY = "SECRET_KEY"

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        })
    }

    try {
        const decodeToken = jwt.verify(token, TOKEN_SECRET_KEY)

        req.userId = decodeToken.id
        req.email = decodeToken.email

        next()
    } catch(err) {
        console.log(err.message);
        return res.status(401).json({
            success: false,
            message: 'Token is not valid.'
        })
        
    }
}

module.exports = verifyToken