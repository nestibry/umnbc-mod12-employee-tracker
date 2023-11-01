// Install Dependencies
const inquirer = require('inquirer');

class AddDepartment {

    constructor(){
        this.name = "";
    }

    async setName(){
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "text",
                message: "Enter Department Name:",
                validate: this.validateDepartmentName,
            },
        ]);
        this.name = response.name;
    }

    async validateDepartmentName(input){
        return (input.length > 5 ) ? true : "Required minimum of 5 characters.";
    }
}

module.exports = AddDepartment;