// const mysql = require("mysql2");
// require("dotenv").config();

// const mySqlPool = mysql.createPool({
// 	host: "localhost",
// 	port: 3306,
// 	user: "root",
// 	password: "",
// 	database: "btlweb",
// 	connectionLimit: 10,
// 	queueLimit: 0,
// 	waitForConnections: true,
// });

// module.exports = mySqlPool;

// Code to push git.
const mysql = require("mysql2");
require("dotenv").config();

const mySqlPool = mysql.createPool({
	host: "localhost",
	port: 3306,
	user: "root",
	password: process.env.PASSWORD_SQL,
	database: "btlweb",
	connectionLimit: 10,
	queueLimit: 0,
	waitForConnections: true,
});

module.exports = mySqlPool;
