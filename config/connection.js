const mysql = require('mysql2');
require("dotenv").config();

// Connect to MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

// db.connect((err) => err ? err : console.log(`Connected to the ${process.env.DB_NAME} database.`));

module.exports = db;