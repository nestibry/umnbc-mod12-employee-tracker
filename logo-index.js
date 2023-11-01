// Install Dependencies
const Logo = require('./lib/Logo.js');

let employeeManagerPrompts = true;


// Script to set and render Logo
// do {

//     const newLogo = new Logo();
//     newLogo.setLogoInfo()
//         .then(() => {
    
//             switch(newLogo.shape) {
//                 case "circle":
//                     break;
//                 case "triangle":
//                     break;
//                 case "square":
//                     employeeManagerPrompts = false;
//                     break;
//                 default:
//                     console.log("Error creating logo, shape not defined properly.");
//             }
//             console.log(`Generated:`);
//             console.log(newLogo);
    
//         });

// } while ( employeeManagerPrompts === true);


// Script to set and render Logo
while ( employeeManagerPrompts === true) {
    
    
    const newLogo = new Logo();
    newLogo.setLogoInfo()
        .then(() => {
    
            switch(newLogo.shape) {
                case "circle":
                    break;
                case "triangle":
                    break;
                case "square":
                    employeeManagerPrompts = false;
                    break;
                default:
                    console.log("Error creating logo, shape not defined properly.");
            }
            console.log(`Generated:`);
            console.log(newLogo);
    
        });


};

