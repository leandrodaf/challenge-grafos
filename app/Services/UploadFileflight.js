const readline = require('readline');

const fs = require('fs');

module.exports.uploadFile = (path) => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    console: false,
  });

  readInterface.on('line', (line) => {
    if (line.split(',').length === 3) {
      fs.appendFileSync('input-routes.csv', '\n' + line, 'utf8');
    }
  });
};
