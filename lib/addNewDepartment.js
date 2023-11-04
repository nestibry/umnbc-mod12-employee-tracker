const db = require('../config/connection.js');
const inquirer = require('inquirer');


async function addNewDepartment() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT name FROM departments`, (err, data) => {
            if (err) reject("Error reading database");
            console.log(data);
            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `Enter name for the new department: `,
                }
            ]).then((response) => {
                console.log(response);
                
                resolve("success");
            });
        });
    });
}


module.exports = addNewDepartment;