import require from './utils/require.js';
import { runRename } from './run-rename.js';
import { runWebp } from './run-webp.js';
import { runCompress } from './run-compress.js';

const { Select } = require('enquirer');

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
