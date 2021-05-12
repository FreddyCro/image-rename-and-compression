const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const quality = process.argv[3] ? +process.argv[3] : 60;

function rename(file) {
  const irregularSymol = /[ -!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/g;
  return file.replace(irregularSymol, '_').toLowerCase();
}

async function execute() {
  const root = './input/';
  const directoryPath = path.join(__dirname, root);

  //passsing directoryPath and callback function
  fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(async (file) => {
      // load local image file with jimp. It supports jpg, png, bmp, tiff and gif:
      await Jimp.read(`${root}${file}`, (err, inputImg) => {
        if (err) throw err;

        inputImg
          .quality(quality)
          .write(`output/${rename(file)}`);
      });
    });

    console.log('done.');
  });
}

execute();
