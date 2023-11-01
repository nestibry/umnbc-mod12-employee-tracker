const inquirer = require('inquirer');

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
        'Update Employee Managers',   // Bonus
        'View Employees by Manager',  // Bonus
        'View Employees by Department', //Bonus
        'Delete Departments, Roles, and Employees', // Bonus
        'View Utilized Budget of a Department',  // Bonus: i.e., the combined salaries of all employees in that department
        'Exit Employee Manager'],
  },
];

async function main() {
  while (true) {
    console.log('Main Menu');
    const answers = await inquirer.prompt(questions);

    if (answers.action === 'Exit Employee Manager') {
      console.log('Goodbye!');
      break; // Exit the loop when the user selects "Exit Employee Manager"
    }

    // Handle other options here based on answers.action
    switch (answers.action) {
      case 'View All Departments':
        console.log('Viewing All Departments:');
        break;
      case 'View All Roles':
        console.log('Viewing All Roles: ');
        break;
    }
  }
}

main();