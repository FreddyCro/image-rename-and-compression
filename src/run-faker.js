import require from './utils/require.js';
import download from 'image-downloader';
import normalizePath from 'normalize-path';
import pathParse from 'path-parse';
import Jimp from 'jimp';
import { faker } from '@faker-js/faker';
const { Select, Input } = require('enquirer');

const types = [
  'abstract',
  'animals',
  'avatar',
  'business',
  'cats',
  'city',
  'food',
  'people',
  'nature',
  'technics',
  'transport',
];

// input type of images
const typePrompt = new Select({
  name: 'type',
  message: 'Input type of images:',
  choices: types,
  initial: 'abstract',
});

// input amount of images
const amountPrompt = new Input({
  name: 'amount',
  message: 'Input amount of images:',
  initial: '1',
  validate: (value) => {
    return +value > 0;
  },
});

// input width of image
const widthPrompt = new Input({
  name: 'width',
  message: 'Input width of image:',
  initial: '640',
  validate: (value) => {
    return +value > 0;
  },
});

// input height of image
const heightPrompt = new Input({
  name: 'height',
  message: 'Input height of image:',
  initial: '480',
  validate: (value) => {
    return +value > 0;
  },
});

const printResolution = new Input({
  name: 'printResolution',
  message: 'Print resolution?',
  choices: ['yes', 'no'],
  initial: 'yes',
});

// input use 2x resolution
const highResolutionPrompt = new Select({
  name: '2x',
  message: 'Use 2x resolution?',
  choices: ['yes', 'no'],
  initial: 'yes',
});

const getImagesUrl = ({ type, amount, w, h, use2x }) => {
  let images = [];

  for (let i = 0; i < amount; i++) {
    if (use2x === 'yes') images.push(faker.image[type](w * 2, h * 2));
    else images.push(faker.image[type](w, h));
  }

  return images;
};

const downloadImage = ({ url, use2x, w, h, printResolution, delay }) => {
  const ROOT_DIR = process.cwd();
  const OUTPUT_DIR = normalizePath(`${ROOT_DIR}/output`);
  const filename = `faker_${Date.now()}`;
  const ext = '.jpg';
  const dist = normalizePath(
    `${OUTPUT_DIR}/${filename}${use2x ? '@2x' : ''}${ext}`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      download
        .image({
          url,
          dest: dist,
        })
        .then(({ distname }) => {
          // handle 2x
          if (use2x === 'yes') {
            Jimp.read(dist, (err, inputImg) => {
              if (err) throw err;

              inputImg
                .scale(0.5)
                .write(normalizePath(`${OUTPUT_DIR}/${filename}${ext}`));

              if (printResolution === 'yes') {
                Jimp.read(dist, (err, inputImg) => {
                  if (err) throw err;

                  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
                    inputImg
                      .scale(0.5)
                      .greyscale()
                      .blur(5)
                      .brightness(0.5)
                      .opacity(0.5)
                      .print(font, 24, 24, {
                        text: `${w}x${h}`,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
                      })
                      .write(
                        normalizePath(
                          `${OUTPUT_DIR}/${filename}_resolution${ext}`
                        )
                      );

                    console.log('Saved to', `${filename}_resolution${ext}`);
                  });
                });
              }

              console.log('Saved to', `${filename}${ext}`);
            });
          }

          if (printResolution === 'yes' && use2x === 'yes') {
            Jimp.read(dist, (err, inputImg) => {
              if (err) throw err;

              Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font) => {
                inputImg
                  .greyscale()
                  .blur(5)
                  .brightness(0.5)
                  .opacity(0.5)
                  .print(font, 24, 24, {
                    text: `${w}x${h}`,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                    alignmentY: Jimp.VERTICAL_ALIGN_TOP,
                  })
                  .write(
                    normalizePath(
                      `${OUTPUT_DIR}/${filename}_resolution@2x${ext}`
                    )
                  );

                console.log('Saved to', `${filename}_resolution@2x${ext}`);
              });
            });
          }

          resolve(
            console.log('Saved to', `${filename}${use2x ? '@2x' : ''}${ext}`)
          );
        })
        .catch((err) => console.error(err));
    }, delay);
  });
};

const runFaker = () => {
  typePrompt.run().then((type) => {
    amountPrompt.run().then((amount) => {
      widthPrompt.run().then((w) => {
        heightPrompt.run().then((h) => {
          printResolution.run().then((printResolution) => {
            highResolutionPrompt.run().then(async (use2x) => {
              const images = getImagesUrl({ type, amount, w, h, use2x });

              for (let i = 0; i < images.length; i++) {
                await downloadImage({
                  url: images[i],
                  use2x,
                  w,
                  h,
                  printResolution,
                  delay: 1000,
                });
              }
            });
          });
        });
      });
    });
  });
};

export { runFaker };
