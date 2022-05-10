import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Select } = require('enquirer');

import fsEx from 'fs-extra';
import pathParse from 'path-parse';
import consola from 'consola';
import chalk from 'chalk';
import normalizePath from 'normalize-path';

import { readFiles } from './utils/file.js';
import { rename, rename2x } from './utils/rename.js';

const runRename = async () => {
  const ROOT_DIR = process.cwd();
  const INPUT_DIR = normalizePath(`${ROOT_DIR}/input`);
  const OUTPUT_DIR = normalizePath(`${ROOT_DIR}/output`);

  const { files } = readFiles(INPUT_DIR);

  try {
    for (const file of files) {
      const { dir, name, ext } = pathParse(file);
      const newDir =
        dir === INPUT_DIR ? '' : rename(dir.replace(INPUT_DIR, ''));

      const newName = rename2x(name);

      await fsEx.copy(
        file,
        normalizePath(`${OUTPUT_DIR}/${newDir}/${newName}${ext}`),
        async (err) => {
          if (err) return consola.error(err);

          consola.log(
            `${name}${ext} is rename to ${chalk.green(newName + ext)}`
          );
        }
      );
    }
  } catch (e) {
    consola.error(e);
  }
};

export { runRename };
