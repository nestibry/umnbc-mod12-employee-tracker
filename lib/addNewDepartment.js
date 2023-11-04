const db = require('../config/connection.js');

function addNewDepartment() {

    db.query(`SELECT name FROM departments`, (err, data) => {
        if (err) return console.log("Error reading database");
        console.table(data);
        // inquirer.prompt([
        //     {
        //         type: "list",
        //         name: "department",
        //         message: `Select a department:`,
        //         choices: data.map((item) => { return { value: item.id, name: item.name } })
        //     }
        // ]).then((response) => {
        //     console.log(response);
        // });
    });

}

module.exports = addNewDepartment;