const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments.js');
const viewAllRoles = require('./viewAllRoles.js');
const addNewDepartment = require('./addNewDepartment.js');

const managerMenuItems = [
    {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
            new inquirer.Separator(),
            'Exit Employee Manager',
            new inquirer.Separator(),
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
            // new inquirer.Separator(),
            // 'Exit Employee Manager',
            // new inquirer.Separator(),
        ],
    },
];


function managerRouter(action) {
    
    switch (action) {
        case 'Exit Employee Manager':
            console.log('Goodbye!');
            return;
        case 'View All Departments':
            console.log('Viewing All Departments');
            viewAllDepartments();
            // viewAllDepartments().then( () => managerMenu() );

            //     setTimeout(() => {
            //         managerMenu();
            //     }, 2000)
            // );
            break;
        case 'View All Roles':
            console.log('Viewing All Roles');
            viewAllRoles();
            // managerMenu();
            break;
        case 'View All Employees':
            console.log('Viewing All Employees:');
            break;
        case 'Add a Department':
            console.log('Add a New Department');
            addNewDepartment();
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
        default:
            console.log('Error: Menu Action functionality does not exist. Please report error to your software development team.');
    }

    setTimeout(() => {
        managerMenu();
    }, 2000);
}



function managerMenu() {

    console.log('Main Menu');
    inquirer.prompt(managerMenuItems).then((selected) => { managerRouter(selected.action); });

}

module.exports = managerMenu;