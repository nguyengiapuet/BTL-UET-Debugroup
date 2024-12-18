const mysql = require("mysql2");
require("dotenv").config();

const mySqlPool = mysql.createPool({
	host: process.env.MYSQL_SERVICE_HOST,
	port: process.env.MYSQL_SERVICE_PORT,
	user: "fall2024c8g3",
	password: "123456789",
	database: "fall2024c8g3_btlweb",
});

module.exports = mySqlPool;
