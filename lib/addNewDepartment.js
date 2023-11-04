const db = require('../config/connection.js');
const inquirer = require('inquirer');
const managerMenu = require('./manager.menu.js');

async function addNewDepartment() {

    db.query(`SELECT name FROM departments`, (err, data) => {
        if (err) return console.log("Error reading database");
        console.log(data);
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: `Enter name for the new department: `,
            }
        ]).then((response) => {
            console.log(response);
            // managerMenu();
        });






    });

}

module.exports = addNewDepartment;