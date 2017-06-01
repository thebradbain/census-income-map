let fs = require('fs');

function clearFile(fileName) {
  fs.writeFileSync(fileName, '', 'utf8');
}

function writeFile(fileName, data) {
  fs.writeFileSync(fileName, data, 'utf8');
}

function appendFile(fileName, data) {
  fs.appendFileSync(fileName, data, 'utf8');
}

module.exports.appendFile = appendFile;
module.exports.writeFile = writeFile;
module.exports.clearFile = clearFile;
