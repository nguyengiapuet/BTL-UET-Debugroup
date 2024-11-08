const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function signInAccount(req, res) {
    try {
        const { email, password } = req.body;

        console.log(req.body);
        

        const user =await db.promise().query("SELECT * FROM account WHERE email = ?", [email]);
        console.log(user[0]);
        
        if (user[0].length===0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // console.log(user[0][password]);
        
        
        const checkPassword = await bcrypt.compare(password, user[0][0].password);
        console.log(checkPassword);
        
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const tokenData = {
            id: user[0][0].id,
            email: email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);

        return res.json({
            success: true,
            message: "Log in successfully",
            accessToken: token,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "err.message",
        });
    }
}

module.exports = signInAccount;
