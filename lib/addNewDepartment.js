const db = require('../config/connection.js');
const inquirer = require('inquirer');

async function addNewDepartment() {

    return new Promise((resolve, reject) => {
        
        db.query(`SELECT name FROM departments`, (err, data) => {
            if (err) reject("Error reading database");
            // console.log(data);

            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: `Enter name for the new department: `,
                    validate: async (input) => {
                        if (data.filter(item => item.name === input).length > 0) {
                            return `The ${input} department already exists.`;
                        } else {
                            return (input.length > 0 && input.length <= 30) ? true : "Text length cannot be null and less than 30 characters";
                        }
                    },
                }
            ]).then((response) => {
                console.log(response);


                // 'Add a Department'
                db.query(`INSERT INTO departments(name) VALUES (?); `, response.name, (err, results) => {
                    if (err) console.log("Error adding a department");
                    // console.log(results);
                    db.query(`SELECT * FROM departments`, (err, data) => {
                        if (err) reject("Error reading database");
                        console.table(data);
                        resolve("success");
                    });
                });
                


            });
        });
    });
}


module.exports = addNewDepartment;