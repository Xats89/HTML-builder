const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const bundleFile = path.join(__dirname, 'project-dist', 'index.html');
const stylesFolder = path.join(__dirname, 'styles');
const bundleCss = path.join(__dirname, 'project-dist', 'style.css');
const assetsFolder = path.join(__dirname, 'assets');
const bundleFolder = path.join(__dirname, 'project-dist');

function createBundleFolder(folderName) {
  fs.mkdir(path.join(__dirname, folderName), { recursive: true }, (err) => {
    if (err) console.log(err);
  });
}

async function createBundleHtml(templateFile, componentsFolder, bundleFile) {
  const writeStream = fs.createWriteStream(bundleFile, 'utf-8');
  const components = await fsPromises.readdir(componentsFolder, {
    withFileTypes: true,
  });

  const componentsValue = {};
  for (let element of components) {
    if (element.name.slice(-4).toLowerCase() === 'html') {
      const componentName = element.name.slice(0, -5);
      const componentValue = (
        await fsPromises.readFile(path.join(componentsFolder, element.name))
      ).toString();
      componentsValue[componentName] = componentValue;
    }
  }

  const template = await fsPromises.readFile(templateFile);
  let result = template.toString();
  for (let key in componentsValue) {
    result = result.replaceAll(`{{${key}}}`, componentsValue[key]);
  }

  writeStream.write(result, 'utf-8');
}

async function createBundleCss(stylesFolder, bundleCss) {
  const writeStream = fs.createWriteStream(bundleCss, 'utf-8');
  const styles = await fsPromises.readdir(stylesFolder, {
    withFileTypes: true,
  });
  for (let element of styles) {
    if (element.name.slice(-3).toLowerCase() === 'css') {
      const styleValue = (
        await fsPromises.readFile(path.join(stylesFolder, element.name))
      ).toString();
      writeStream.write(styleValue, 'utf-8');
    }
  }
}

async function copyDirectory(srcFolder, destFolder) {
  await fsPromises.mkdir(path.join(destFolder, path.basename(srcFolder)), {
    recursive: true,
  });

  let items = await fsPromises.readdir(srcFolder, {
    withFileTypes: true,
  });

  for (let i = 0; i < items.length; i++) {
    if (items[i].isDirectory()) {
      copyDirectory(
        path.join(srcFolder, items[i].name),
        path.join(destFolder, path.basename(srcFolder)),
      );
    } else {
      await fsPromises.copyFile(
        path.join(srcFolder, items[i].name),
        path.join(destFolder, path.basename(srcFolder), items[i].name),
      );
    }
  }
}

fs.rm(bundleFolder, { recursive: true, force: true }, () => {
  createBundleFolder('project-dist');
  createBundleHtml(templateFile, componentsFolder, bundleFile);
  createBundleCss(stylesFolder, bundleCss);
  copyDirectory(assetsFolder, bundleFolder);
});
