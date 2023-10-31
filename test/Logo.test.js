const Logo = require('../lib/Logo.js');
const inquirer = require('inquirer');


// Mock Inquirer to avoid acutal user prompts => from ChatGPT3.5 response to question "in javascript, how to test an inquirer prompt function within a class using jest framework"
jest.mock('inquirer');

describe("Logo", () => {

    describe("instantiation", () => {
        it("should instantiate correctly", () => {
            const logo = new Logo();
            expect(logo).toBeInstanceOf(Logo);
        });
    });

    describe("setLogoInfo() method inquirer prompts", () => {

        // Mock Inquirer to avoid acutal user prompts => from ChatGPT3.5 response to question "in javascript, how to test an inquirer prompt function within a class using jest framework"
        // Note to TA's: I added this functionality because I understand what it does, just needed help finding a tool to use to mock inquire prompt responses and found that tool using ChatGPT
        beforeEach(() => jest.clearAllMocks());

        it("should return the text entered by the user", async () => {
            const myInstance = new Logo();

            // Simulate user input 
            inquirer.prompt.mockResolvedValue({text:'bmw'}); 
            await myInstance.setLogoInfo();

            expect(myInstance.text).toBe('bmw');
        });

        it("should return the textcolor entered by the user", async () => {
            const myInstance = new Logo();

            // Simulate user input 
            inquirer.prompt.mockResolvedValue({textcolor:'white'}); 
            await myInstance.setLogoInfo();

            expect(myInstance.textcolor).toBe('white');
        });

        it("should return the shape entered by the user", async () => {
            const myInstance = new Logo();

            // Simulate user input 
            inquirer.prompt.mockResolvedValue({shape:'circle'}); 
            await myInstance.setLogoInfo();

            expect(myInstance.shape).toBe('circle');
        });

        it("should return the shapecolor entered by the user", async () => {
            const myInstance = new Logo();

            // Simulate user input 
            inquirer.prompt.mockResolvedValue({shapecolor:'blue'}); 
            await myInstance.setLogoInfo();

            expect(myInstance.shapecolor).toBe('blue');
        });

        it("should return the Logo data entered by the user", async () => {
            const newLogo = new Logo();
            newLogo.text = "bmw";
            newLogo.textcolor = "white";
            newLogo.shape = "circle";
            newLogo.shapecolor = "blue";
            
            // Simulate user input 
            const myInstance = new Logo();
            inquirer.prompt.mockResolvedValue({text:'bmw', textcolor:'white', shape:'circle', shapecolor:'blue'}); 
            await myInstance.setLogoInfo();

            expect(myInstance).toMatchObject(newLogo);
        });


    });
    
    // Validation Functions => See https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
    describe("validateLogoTextLength() method", () => {
        
        
        it("should return true on text length less than or equal to 3 characters and more than 0 characters entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoTextLength("thn");
            expect(result).toBe(true);
        });

        it("should return Error Message on text length more than 3 characters entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoTextLength("thn4");
            expect(result).toBe("Incorrect text length. Delete characters to try again...");
        });

        it("should return Error Message on text length of 0 characters entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoTextLength("");
            expect(result).toBe("Incorrect text length. Delete characters to try again...");
        });

    });

    describe("validateLogoColor() method", () => {
        
        
        it("should return true on a correct color name entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoColor("red");
            expect(result).toBe(true);
        });

        it("should return true on a correct hexadecimal (w/ #) color code entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoColor("#AABBCC");
            expect(result).toBe(true);
        });

        it("should return Error Message on incorrect hexadecimal (w/o #) color code entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoColor("AABBCC");
            expect(result).toBe("Invalid color. Delete characters to try again...");
        });

        it("should return Error Message on incorrect color name entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoColor("der");
            expect(result).toBe("Invalid color. Delete characters to try again...");
        });

        it("should return Error Message on incorrect hexadecimal (w/ #) color code entered by the user", async () => {
            const myInstance = new Logo();
            const result = await myInstance.validateLogoColor("#GGGGGG");
            expect(result).toBe("Invalid color. Delete characters to try again...");
        });

    });
    
});