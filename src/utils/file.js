import glob from 'glob';

const readFiles = (dict) => {
  const allFiles = glob.sync(`${dict}/**/*`, {
    absolute: true,
  });

  const allFilesWithoutDictonaries = glob.sync(`${dict}/**/*`, {
    nodir: true,
    absolute: true,
  });

  const allDictionaries = allFiles.filter(
    (e) => !allFilesWithoutDictonaries.includes(e)
  );

  return { dicts: allDictionaries, files: allFilesWithoutDictonaries };
};

const writeFile = () => {};

const copyFile = () => {};

export { readFiles, writeFile, copyFile };
