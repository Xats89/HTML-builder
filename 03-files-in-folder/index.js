const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true})
  .then(direntData => {
    direntData.forEach((direntElement) => {
      if(direntElement.isFile()) {
        const filePath = path.join(folderPath, direntElement.name);
        const fileInfo = path.parse(filePath);

        fs.stat(filePath)
          .then(fileStat => {
            const result = `${fileInfo.name} - ${fileInfo.ext.replace('.', '')} - ${fileStat.size * 0.001}kb`
            console.log(result)
          }).catch(err => {
            console.log(err);
          });
      };
    });
  }).catch(err => {
    console.log(err);
  });