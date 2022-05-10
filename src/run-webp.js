import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Input } = require('enquirer');

import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import pathParse from 'path-parse';
import consola from 'consola';
import chalk from 'chalk';
import normalizePath from 'normalize-path';
import Jimp from 'jimp';

import { readFiles } from './utils/file.js';
import { rename, rename2x } from './utils/rename.js';

const handleWebp = (quality) => {
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

        imagemin([normalizePath(file)], {
          destination: normalizePath(`${OUTPUT_DIR}/${newDir}`),
          plugins: [imageminWebp({ quality })],
          method: 6,
        }).then((e) => {
          if (e.length === 0) {
            consola.error(`${chalk.red(name + ext)} was failure.`);
          } else {
            console.log(
              `${chalk.green(name + ext)} has converted to ${chalk.green(
                name + '.webp'
              )}`
            );
          }

          resolve();
        });
      });
    });

    Promise.all(pAll).then(() => {
      consola.success('All files was done.');
    });
  } catch (e) {
    consola.error(e);
  }
};

const runWebp = () => {
  const prompt = new Input({
    type: 'input',
    name: 'webp quality prompt',
    message: 'Input webp quality(0~100):',
    initial: '90',
    validate: (value) => {
      return +value >= 0 && +value <= 100;
    },
  });

  prompt
    .run()
    .then((quality) => handleWebp(+quality))
    .catch(console.error);
};

export { runWebp };
