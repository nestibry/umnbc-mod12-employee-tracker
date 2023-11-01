const AddDepartment = require('../lib/AddDepartment.js');
const inquirer = require('inquirer');


// Mock Inquirer to avoid acutal user prompts => from ChatGPT3.5 response to question "in javascript, how to test an inquirer prompt function within a class using jest framework"
jest.mock('inquirer');

describe("Add Department", () => {

    describe("instantiation", () => {
        it("should instantiate correctly", () => {
            const myInstance = new AddDepartment();
            expect(myInstance).toBeInstanceOf(AddDepartment);
        });
    });

    describe("setName() method inquirer prompts", () => {

        // Mock Inquirer to avoid acutal user prompts => from ChatGPT3.5 response to question "in javascript, how to test an inquirer prompt function within a class using jest framework"
        // Note to TA's: I added this functionality because I understand what it does, just needed help finding a tool to use to mock inquire prompt responses and found that tool using ChatGPT
        beforeEach(() => jest.clearAllMocks());

        it("should return the name entered by the user", async () => {
            const myInstance = new AddDepartment();

            // Simulate user input 
            inquirer.prompt.mockResolvedValue({name:'Service'}); 
            await myInstance.setName();

            expect(myInstance.name).toBe('Service');
        });

        it("should return the Logo data entered by the user", async () => {
            const newDepartment = new AddDepartment();
            newDepartment.name = "Service";
        
            // Simulate user input 
            const myInstance = new AddDepartment();
            inquirer.prompt.mockResolvedValue({name:'Service'}); 
            await myInstance.setName();

            expect(myInstance).toMatchObject(newDepartment);
        });


    });
    
    // Validation Functions => See https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
    describe("validateLogoTextLength() method", () => {
        
        
        it("should return true on text length greater than or equal to 3 characters entered by the user", async () => {
            const myInstance = new AddDepartment();
            const result = await myInstance.validateDepartmentName("Service");
            expect(result).toBe(true);
        });

        it("should return Error Message on text length less than or equal to 2 characters entered by the user", async () => {
            const myInstance = new AddDepartment();
            const result = await myInstance.validateDepartmentName("Sa");
            expect(result).toBe("Required minimum of 3 characters...");
        });

    });


    
});
