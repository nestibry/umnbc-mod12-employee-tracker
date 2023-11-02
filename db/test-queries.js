const db = require('../config/connection.js');
// const cTable = require('console.table');

db;

console.log("Starting Queries...");

db.query(`SELECT * FROM department`, function (err, results) {
    console.log("Departments:");
    // console.log(results);
    console.table(results);
});

db.query(`SELECT * FROM role`, function (err, results) {
    console.log("Roles");
    // console.log(results);
    console.table(results);
});

db.query(`SELECT * FROM employee`, function (err, results) {
    console.log("Employees");
    // console.log(results);
    console.table(results);
});
