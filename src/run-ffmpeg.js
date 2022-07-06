import require from './utils/require.js';
import { readFiles } from './utils/file.js';
import pathParse from 'path-parse';
import normalizePath from 'normalize-path';
import consola from 'consola';
import chalk from 'chalk';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';
// import ffmpeg from 'ffmpeg';
// import ffmpeg from 'fluent-ffmpeg';

const runFFmpeg = () => {
  const ROOT_DIR = process.cwd();
  const INPUT_DIR = normalizePath(`${ROOT_DIR}/input-video`);
  const OUTPUT_DIR = normalizePath(`${ROOT_DIR}/output-video`);

  const { files } = readFiles(INPUT_DIR);

  files.forEach((file) => {
    // TODO: // https://www.npmjs.com/package/ffmpeg.js
    console.log(ffmpeg);
  });
};

export { runFFmpeg };
