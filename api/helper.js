const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY_TOKEN, JWT_SECRET } = require("../config/keys");

// TODO: Make all async
const hash = (password, salt = bcrypt.genSaltSync(10)) => {
  const hashVal = bcrypt.hashSync(password, salt);
  return hashVal;
};

const comparePassword = (password, hashVal) => {
  return bcrypt.compareSync(password, hashVal);
};

const generatePassword = () => {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const num = "0123456789";

  let pass = "";
  let passwordLength = 0;
  while (passwordLength < 7) {
    pass += lower[Math.floor(Math.random() * lower.length)];
    passwordLength += 1;
  }

  pass = pass.replace(pass[3], pass[3].toUpperCase());
  pass += num[Math.floor(Math.random() * num.length)];
  return pass;
};

const generateToken = data => {
  const secret = JWT_SECRET || "incredibleMagma";
  const expiry = JWT_EXPIRY_TOKEN || 300;

  return jwt.sign(data, secret, {
    expiresIn: expiry
  });
};

module.exports = { hash, comparePassword, generatePassword, generateToken };
