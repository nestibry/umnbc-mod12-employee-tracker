const db = require('../config/connection.js');

async function viewAllDepartments() {
    db.query(`SELECT * FROM departments`, (err, data) => {
        if (err) return console.log("Error reading database");
        console.table(data);
    });
}

module.exports =  viewAllDepartments ;
