const db = require('../config/connection.js');
const managerMenu = require('./manager.menu.js');

function getDepartments() {
    db.query(`SELECT * FROM departments`, (err, data) => {
        if (err) return console.log("Error reading database");
        console.table(data);
        // managerMenu();
    });
}

module.exports =  getDepartments ;


// getDepartments();