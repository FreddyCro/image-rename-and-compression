import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Select } = require('enquirer');

import { runRename } from './run-rename.js';
import { runWebp } from './run-webp.js';
import { runCompress } from './run-compress.js';

const prompt = new Select({
  name: 'Rename and compress',
  message: 'Choose one process:',
  choices: ['rename', 'compress', 'webp'],
});

prompt
  .run()
  .then((ans) => {
    switch (ans) {
      case 'rename':
        runRename();
        break;

      case 'webp':
        runWebp();
        break;

      case 'compress':
        runCompress();
        break;
    }
  })
  .catch(console.error);
