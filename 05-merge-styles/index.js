const fs = require('fs');
const path = require('path');

const cssFolder = path.join(__dirname, 'styles');
const bundleFolder = path.join(__dirname, 'project-dist');
const writeStream = fs.createWriteStream(path.join(bundleFolder, 'bundle.css'));

fs.readdir(cssFolder, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(cssFolder, file);
    const fileInfo = path.parse(filePath);
    fs.stat(filePath, (err, el) => {
      if (err) throw err;
      if (el.isFile() && fileInfo.ext === '.css') {
        const readStream = fs.createReadStream(filePath);
        readStream.on('data', (data) => {
          writeStream.write(data.toString() + '\n');
        });
      }
    });
  });
});
