const db = require('../config/connection.js');

function getDepartments() {
    db.query(`SELECT * FROM departments`, (err, data) => {
        if (err) return console.log("Error reading database");
        console.table(data);
    });
}

module.exports =  getDepartments ;


// getDepartments();