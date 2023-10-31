// Install Dependencies
const fs = require('fs');
const Logo = require('./lib/Logo.js');


// Script to set and render Logo
const newLogo = new Logo();
newLogo.setLogoInfo()
    .then(() => {

        console.log(`Generated: ${fileName}`);

    });




