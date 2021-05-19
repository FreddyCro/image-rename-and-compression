function rename(file) {
  const irregularSymol = /[ -!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/g;
  return file.replace(irregularSymol, '_').toLowerCase();
}

module.exports = { rename };
