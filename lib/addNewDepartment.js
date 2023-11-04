const db = require('../config/connection.js');
const inquirer = require('inquirer');
const managerMenu = require('./manager.menu.js');

///////////////////////////////////////////////////////////////
// function addNewDepartment() {

//     db.query(`SELECT name FROM departments`, (err, data) => {
//         if (err) return console.log("Error reading database");
//         console.log(data);
//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "name",
//                 message: `Enter name for the new department: `,
//             }
//         ]).then((response) => {
//             console.log(response);
//             // managerMenu();
//         });
//     });
// }
////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
async function addNewDepartment() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT name FROM departments`, (err, data) => {
            if (err) reject();
            console.log(data);
            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `Enter name for the new department: `,
                }
            ]).then((response) => {
                console.log(response);
                resolve();
            });
        });
    });
}
////////////////////////////////////////////////////////////////////////////////

module.exports = addNewDepartment;