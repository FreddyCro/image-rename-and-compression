const path = require('path');
const fs = require('fs');
const { rename } = require('./utils/rename');

async function execute() {
  const root = './input/';
  const directoryPath = path.join(__dirname, `../${root}`);

  //passsing directoryPath and callback function
  fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    //listing all files using forEach
    files.forEach(async (file) => {
      try {
        await fs.copyFile(`${root}${file}`, `output/${rename(file)}`, () => console.log(`${root}${file} was copied to output/${rename(file)}`));
      } catch {
        console.log('The file could not be copied');
      }
    });
  });
}

execute();
