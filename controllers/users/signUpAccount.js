const db = require("../../config/db")
const bcrypt = require('bcryptjs')

async function signUpAccount(req, res) {
    try {
        const { username, email, password, avatar } = req.body
        console.log(req.body);
        
        const e =await db.promise().query('SELECT * FROM account WHERE email = ?', [email])
        console.log(e);
        
        if (e[0].length > 0) {
            res.status(400).json({
                success: false,
                message: "Email already exists",

            })
        }

        // console.log(user);
        
        

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt)

        const payload = {
            ...req.body,
            password:  hashPassword,
            role: 'user'
        }

        console.log(payload);
        


        db.query(`INSERT INTO account (username, email, password, role, avatar) VALUES (?, ?, ?, ?, ?)`,
            [username, email, hashPassword, 'user', avatar],
            function(err, result) {
                res.json({
                    success: true,
                    message: "Account created successfully",
                    data: result
                })
            }
        )
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = signUpAccount