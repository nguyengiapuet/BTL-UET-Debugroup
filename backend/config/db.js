const mysql = require('mysql2')

const mySqlPool = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: process.env.PASSWORD_SQL,
    database:'btlweb',
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true
})

module.exports = mySqlPool