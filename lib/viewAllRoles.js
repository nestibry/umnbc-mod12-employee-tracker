const db = require('../config/connection.js');

function viewAllRoles() {
    db.query(`SELECT * FROM roles`, (err, data) => {
        if (err) return console.log("Error reading database");
        console.table(data);
    });
}

module.exports =  viewAllRoles ;
