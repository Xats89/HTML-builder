const fs = require('fs');
const path = require('path');

const filesFolder = path.join(__dirname, 'files');
const copyFilesFolder = path.join(__dirname, 'files-copy');

function delCopyFiles() {
  fs.readdir(copyFilesFolder, (err, data) => {
    if (err) return;
    data.forEach((file) => {
      fs.unlink(path.join(copyFilesFolder, file), (err) => {
        if (err) throw err;
      });
    });
  });
}

function createCopyFolder() {
  fs.mkdir(copyFilesFolder, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
}

function copyFiles() {
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
}

delCopyFiles();
createCopyFolder();
copyFiles();
