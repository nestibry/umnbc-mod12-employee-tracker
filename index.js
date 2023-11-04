const inquirer = require('inquirer');
const getDepartments = require('./lib/get.departments.js');


const employeeManagerStr = `

███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                     
                                                                     
███    ███  █████  ███    ██  █████   ██████  ███████ ██████         
████  ████ ██   ██ ████   ██ ██   ██ ██       ██      ██   ██        
██ ████ ██ ███████ ██ ██  ██ ███████ ██   ███ █████   ██████         
██  ██  ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██      ██   ██        
██      ██ ██   ██ ██   ████ ██   ██  ██████  ███████ ██   ██        
                                                                     
                                                                     

`;

console.log(employeeManagerStr);

const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
            'View All Departments',
            'View All Employees',
            'View All Roles', 
            'Add a Department',
            'Add an Employee',
            'Add a Role',
            'Update an Employee Role',
            // 'Update Employee Managers',   // Bonus
            // 'View Employees by Manager',  // Bonus
            // 'View Employees by Department', //Bonus
            // 'Delete Departments, Roles, and Employees', // Bonus
            // 'View Utilized Budget of a Department',  // Bonus: i.e., the combined salaries of all employees in that department
            new inquirer.Separator(),
            'Exit Employee Manager',
            new inquirer.Separator(),
        ],
    },
];

let isManagerActive = true;
async function main() {
    while (isManagerActive) {
        console.log('Main Menu');
        const answers = await inquirer.prompt(questions);

        if (answers.action === 'Exit Employee Manager') {
            console.log('Goodbye!');
            isManagerActive = false;
            break; // Exit the loop when the user selects "Exit Employee Manager"
        }

        // Handle other options here based on answers.action
        switch (answers.action) {
            case 'View All Departments':
                setTimeout(() => {
                    console.log('Viewing All Departments:');
                    getDepartments();
                    console.log("does it get here?");
                }, 1000);
                break;
            case 'View All Roles':
                console.log('Viewing All Roles:');
                break;
            case 'View All Employees':
                console.log('Viewing All Employees:');
                break;
            case 'Add a Department':
                console.log('Adding a Department:');
                break;
            case 'Add a Role':
                console.log('Adding a Roles:');
                break;
            case 'Add an Employee':
                console.log('Adding an Employee:');
                break;
            case 'Update an Employee Role':
                console.log('Updating an Employee Role:');
                break;
            
        }
    }
}

main();

console.log("Does it make it past the main() call??");