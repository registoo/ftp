const path = require('path');
const initJsonHash = require('../src/serverside/initJsonHash');

const ftpHere = path.join(__dirname, '..', 'FTPfiles');

const files = () => initJsonHash(ftpHere);

module.exports = files;
