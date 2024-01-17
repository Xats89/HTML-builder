const fs = require('fs');
const path = require('path');
const process = require('node:process');
const {stdin} = process;

const file = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(file, 'utf-8');
console.log('Hello! write text in console: \n')

stdin.on('data', data => data.toString().trim() === 'exit' 
 ? process.exit() 
 : writeStream.write(data, 'utf-8'));

 process.on("SIGINT", () => process.exit());
 process.on('exit', () => console.log("\nYou finished writing. Bye"));