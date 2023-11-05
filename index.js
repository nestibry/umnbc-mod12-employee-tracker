const inquirer = require('inquirer');

const { viewAllDepartments, 
        addDepartment, 
        deleteDepartment } = require('./lib/Departments.js');


const { viewAllRoles, 
        addRole } = require('./lib/Roles.js');

const { viewAllEmployees, 
        viewEmployeesByManager, 
        viewEmployeesByDepartment, 
        addEmployee, 
        updateEmployeeRole,
        updateEmployeeManager } = require('./lib/Employees.js');


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



const managerMenuItems = [
    {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: [
            new inquirer.Separator(),
            'Exit Employee Manager',
            new inquirer.Separator(),
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'View Employees by Manager',  // Bonus
            'View Employees by Department', //Bonus
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            `Update an Employee's Role`,
            `Update an Employee's Manager`,   // Bonus
            'Delete a Department',    // Bonus
            // 'Delete Departments, Roles, and Employees', // Bonus
            // 'View Utilized Budget of a Department',  // Bonus: i.e., the combined salaries of all employees in that department
        ],
    },
];


async function managerRouter(action) {
    
    switch (action) {

        case 'Exit Employee Manager':
            console.log('Goodbye!');
            return;

        case 'View all Departments':
            var response = await viewAllDepartments();
            (response.status === "success") ? console.table(response.body) : console.log(response);
            break;

        case 'View all Roles':
            var response = await viewAllRoles();
            (response.status === "success") ? console.table(response.body) : console.log(response);
            break;

        case 'View all Employees':
            var response = await viewAllEmployees();
            (response.status === "success") ? console.table(response.body) : console.log(response);
            break;
        
        case 'View Employees by Manager':
            var response = await viewEmployeesByManager();
            (response.status === "success") ? console.table(response.body) : console.log(response);
            break;

        case 'View Employees by Department':
            var response = await viewEmployeesByDepartment();
            (response.status === "success") ? console.table(response.body) : console.log(response);
            break;

        case 'Add a Department':
            var response = await addDepartment();
            if(response.status === "error") {
                console.log(response);
            } else{
                var response = await viewAllDepartments();
                (response.status === "success") ? console.table(response.body) : console.log(response);
            }
            break;

        case 'Add a Role':
            var response = await addRole();
            if(response.status === "error") {
                console.log(response);
            } else{
                var response = await viewAllRoles();
                (response.status === "success") ? console.table(response.body) : console.log(response);
            }
            break;

        case 'Add an Employee':
            var response = await addEmployee();
            if(response.status === "error") {
                console.log(response);
            } else{
                var response = await viewAllEmployees();
                (response.status === "success") ? console.table(response.body) : console.log(response);
            }
            break;

        case `Update an Employee's Role`:
            var response = await updateEmployeeRole();
            if(response.status === "error") {
                console.log(response);
            } else{
                var response = await viewAllEmployees();
                (response.status === "success") ? console.table(response.body) : console.log(response);
            }
            break;
        
        case `Update an Employee's Manager`:
            var response = await updateEmployeeManager();
            if(response.status === "error") {
                console.log(response);
            } else{
                var response = await viewAllEmployees();
                (response.status === "success") ? console.table(response.body) : console.log(response);
            }
            break;

        case 'Delete a Department':
            var response = await deleteDepartment();
            if(response.status === "error") {
                console.log(response);
            } else{
                var response = await viewAllDepartments();
                (response.status === "success") ? console.table(response.body) : console.log(response);
            }
            break;

        default:
            console.log('Error: Menu Action functionality does not exist. Please report error to your software development team.');
    }
    // Return to Employee Manager Menu
    setTimeout(() => {
        managerMenu();
    }, 1000);
}



function managerMenu() {

    console.log('\nMain Menu\n');
    inquirer.prompt(managerMenuItems).then((selected) => { managerRouter(selected.action); });

}
managerMenu();

