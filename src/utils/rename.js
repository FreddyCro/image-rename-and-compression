import slugify from '@sindresorhus/slugify';

const rename = (str) => {
  let newStr = slugify(str, {
    separator: '_',
    customReplacements: [['+', '_plus']],
  });

  if (newStr.length === 0) newStr = `empty_${new Date().getTime()}`;

  return newStr;
};

const rename2x = (str) => {
  const TWO_X = '@2x';
  const TWO_X_REPLACEMENT = 'at_2_x_resolution';

  let newStr = slugify(str, {
    separator: '_',
    // decamelize: false,
    customReplacements: [
      [TWO_X, TWO_X_REPLACEMENT],
      ['+', '_plus'],
    ],
  });

  newStr = newStr.replace(TWO_X_REPLACEMENT, TWO_X);
  if (newStr.length === 0) newStr = `empty_${new Date().getTime()}`;

  return newStr;
};

export { rename, rename2x };
