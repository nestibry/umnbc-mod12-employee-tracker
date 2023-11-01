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
        return (input.length >= 3 ) ? true : "Required minimum of 3 characters...";
    }
}

module.exports = AddDepartment;