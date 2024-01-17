const fs = require('fs');
const path = require('path');
const process = require('node:process');

const file = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(file, 'utf-8');

readStream.on('data', data => console.log(data));