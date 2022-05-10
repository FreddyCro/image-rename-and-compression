import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Input } = require('enquirer');

import pathParse from 'path-parse';
import consola from 'consola';
import chalk from 'chalk';
import normalizePath from 'normalize-path';
import Jimp from 'jimp';

import { readFiles } from './utils/file.js';
import { rename, rename2x } from './utils/rename.js';

const handleCompress = (quality) => {
  const ROOT_DIR = process.cwd();
  const INPUT_DIR = normalizePath(`${ROOT_DIR}/input`);
  const OUTPUT_DIR = normalizePath(`${ROOT_DIR}/output`);

  const { files } = readFiles(INPUT_DIR);

  try {
    const pAll = files.map((file) => {
      return new Promise((resolve, reject) => {
        const { dir, name, ext } = pathParse(file);
        const newDir =
          dir === INPUT_DIR ? '' : rename(dir.replace(INPUT_DIR, ''));

        const newName = rename2x(name);

        Jimp.read(file, async (err, inputImg) => {
          if (err) throw err;

          await inputImg
            .quality(quality)
            .write(normalizePath(`${OUTPUT_DIR}/${newDir}/${newName}${ext}`));

          console.log(`Compressed ${chalk.green(newName + ext)} successfully`);

          resolve();
        });
      });
    });

    Promise.all(pAll).then(() => {
      consola.success('All files has been compressed');
    });
  } catch (e) {
    consola.error(e);
  }
};

const runCompress = () => {
  const prompt = new Input({
    type: 'input',
    name: 'compress quality prompt',
    message: 'Input compress quality(0~100):',
    validate: (value) => {
      return +value >= 0 && +value <= 100;
    },
  });

  prompt
    .run()
    .then((quality) => handleCompress(+quality))
    .catch(console.error);
};

export { runCompress };
