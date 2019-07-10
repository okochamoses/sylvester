const bcrypt = require("bcrypt");

// TODO: Make all async
const hash = (password, salt = bcrypt.genSaltSync(10)) => {
  const hashVal = bcrypt.hashSync(password, salt);
  return hashVal;
};

const comparePassword = (password, hashVal) => {
  return bcrypt.compareSync(password, hashVal);
};

module.exports = { hash, comparePassword };
