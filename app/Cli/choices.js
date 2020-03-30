#!/usr/bin/env node
const inquirer = require('inquirer');
const FlightService = require('../Services/FlightService');
const {uploadFile} = require('../../app/Services/UploadFileflight');

if (process.argv[2]) {
  uploadFile(process.argv[2]);
}

(async () => {
  result = await inquirer.prompt([
    {
      name: 'toFrom',
      type: 'input',
      message: 'Please enter the route:',
      default: 'GRU-CDG',
      validate: (input) => {
        if (input.split('-').length !== 2) {
          return 'Invalid format. Use the "to-from" syntax';
        } else {
          return true;
        }
      },
    },
  ]);

  const [to, from] = result.toFrom.split('-');

  const {bestRoute, price} = FlightService.bestFlight(to, from);

  console.log(`best route: ${bestRoute.join(', ')} > ${price}`);
})();
