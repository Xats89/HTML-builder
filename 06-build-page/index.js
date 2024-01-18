const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');

function createBundleFolder(folderName) {
  fs.mkdir(path.join(__dirname, folderName), { recursive: true }, (err) => {
    if (err) console.log(err);
  });
}

// async function getDataFile(filePath) {
//   await fs.read(filePath)
// }

async function createBundleHtml(templateFile, componentsFolder) {
  await fs.readFile(templateFile, (err, templateData) => {
    // templateData.toString();
    fs.readdir(componentsFolder, (err, componentFiles) => {
      let res = templateData.toString();

      componentFiles.forEach((file) => {
        const filePath = path.join(componentsFolder, file);
        const fileInfo = path.parse(filePath);

        fs.readFile(filePath, (err, fileData) => {
          res = res.replace(`{{${fileInfo.name}}}`, fileData.toString());
        });
      });
      console.log(res);
    });
  });
}
createBundleFolder('project-dist');
createBundleHtml(templateFile, componentsFolder);
// getDataFile(templateFile);
// console.log(getDataFile(templateFile));
