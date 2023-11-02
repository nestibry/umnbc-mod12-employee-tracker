const db = require('../config/connection.js');

db;

console.log("Starting Queries...");

db.query(`SELECT * FROM department`, function (err, results) {
    console.log("Departments:");
    console.log(results);
});

db.query(`SELECT * FROM role`, function (err, results) {
    console.log("Roles");
    console.log(results);
});

db.query(`SELECT * FROM employee`, function (err, results) {
    console.log("Employees");
    console.log(results);
});
