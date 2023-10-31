// Install Dependencies
const inquirer = require('inquirer');
const convert = require('color-convert');


class Logo {
    constructor(){
        this.text = "";
        this.textcolor = "";
        this.shape = "";
        this.shapecolor = "";  
    }

    async setLogoInfo(){
        const response = await inquirer.prompt([
            {
                type: "input",
                name: "text",
                message: "Enter text for the logo, cannot be more than 3 characters:",
                default: "thn",
                validate: this.validateLogoTextLength,
            },
            {
                type: "input",
                name: "textcolor",
                message: "Enter a text color (name or hexadecimal value):",
                default: "white",
                validate: this.validateLogoColor,
            },
            {
                type: "list",
                name: "shape",
                message: "Select a shape for the logo:",
                choices: [  
                    "circle",
                    "triangle",
                    "square",
                ],
            },
            {
                type: "input",
                name: "shapecolor",
                message: "Enter a shape color (name or hexadecimal value):",
                default: "blue",
                validate: this.validateLogoColor,
            },

        ]);

        this.text = response.text;
        this.textcolor = response.textcolor;
        this.shape = response.shape;
        this.shapecolor = response.shapecolor;

    }

    async validateLogoTextLength(input){
        return (input.length > 0 && input.length <= 3 ) ? true : "Incorrect text length. Delete characters to try again...";
    }

    /*
        Check to see if the input is an RGB value or valid Hex Value
        Notes:
            1. const hexColorPattern = /^#([0-9A-F]{6})$/i; => Define a regular expression pattern for a hexadecimal color code => see StackOverflow that describes this type of test method https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
            2. Use the test() method to check if the input matches a hex pattern || if the color name is an rgb value
    */
    async validateLogoColor(input){ 
        const hexColorPattern = /^#([0-9A-F]{6})$/i;  
        return ( hexColorPattern.test(input) || convert.keyword.rgb(input) ) ? true : "Invalid color. Delete characters to try again..."
    }

}

module.exports = Logo;



