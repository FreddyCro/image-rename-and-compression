import require from './utils/require.js';
import { runRename } from './run-rename.js';
import { runWebp } from './run-webp.js';
import { runCompress } from './run-compress.js';
import { runFaker } from './run-faker.js';

const { Select } = require('enquirer');

const prompt = new Select({
  name: 'Rename and compress',
  message: 'Choose one process:',
  choices: ['webp', 'rename', 'compress', 'faker'],
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

      case 'faker':
        runFaker();
        break;
    }
  })
  .catch(console.error);
