const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY_TOKEN, JWT_SECRET, JWT_SECRET_ADMIN } = require("../config/keys");

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

const generateToken = (data, type = null) => {
  const secret = (type === "admin" ? JWT_SECRET_ADMIN : JWT_SECRET) || "incredibleMagma";
  const expiry = JWT_EXPIRY_TOKEN || 300;

  return jwt.sign(data, secret, {
    expiresIn: expiry
  });
};

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

// This uses the harvesine formula to calculate the distance between two points on the earth
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

module.exports = { hash, comparePassword, generatePassword, generateToken, getDistanceFromLatLonInKm };
