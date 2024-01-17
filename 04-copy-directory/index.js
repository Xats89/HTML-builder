const fs = require('fs');
const path = require('path');

const filesFolder = path.join(__dirname, 'files');
const copyFilesFolder = path.join(__dirname, 'files-copy');

// исправить: если есть папка с копией - то её сразу удалить, а потом создать заново
fs.stat(copyFilesFolder, (err) => {
  if (err) {
    fs.mkdir(copyFilesFolder, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  } else {
    fs.rm(copyFilesFolder, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
  }
});

fs.readdir(filesFolder, (err, data) => {
  data.forEach((file) => {
    fs.copyFile(
      path.join(filesFolder, file),
      path.join(copyFilesFolder, file),
      (err) => {
        if (err) console.log(err);
      },
    );
  });
});
