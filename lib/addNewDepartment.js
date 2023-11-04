const db = require('../config/connection.js');
const inquirer = require('inquirer');

async function validateDeparmentName(input){
    return (input.length > 0 && input.length <= 30 ) ? true : "Text length cannot be null and less than 30 characters";
}

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
                    validate: validateDeparmentName,
                }
            ]).then((response) => {
                console.log(response);

                resolve("success");
            });
        });
    });
}


module.exports = addNewDepartment;