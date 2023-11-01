const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an action:',
    choices: ['Option 1', 'Option 2', 'Quit'],
  },
];

async function main() {
  while (true) {
    const answers = await inquirer.prompt(questions);

    if (answers.action === 'Quit') {
      console.log('Goodbye!');
      break; // Exit the loop when the user selects "Quit"
    }

    // Handle other options here based on answers.action
    switch (answers.action) {
      case 'Option 1':
        console.log('You selected Option 1');
        break;
      case 'Option 2':
        console.log('You selected Option 2');
        break;
    }
  }
}

main();