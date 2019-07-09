const validator = require("validator");

const customerValidator = {};

customerValidator.email = email => {
  return validator.isEmail(email);
};

customerValidator.name = name => {
  if (name.length < 2 || name.length > 32) {
    return false;
  }
  if (!validator.isAlpha) {
    return false;
  }
  return true;
};

customerValidator.username = username => {
  if (username.length < 2 || username.length > 32) {
    return false;
  }
  if (!validator.isAlpha) {
    return false;
  }
  return true;
};

customerValidator.phoneNumber = phoneNumber => {
  if (!validator.isMobilePhone(phoneNumber, ["ar-SA", "en-NG"])) {
    return false;
  }
  return true;
};

customerValidator.password = password => {
  const regex = new RegExp("^[a-zA-Z0-9]+$");
  if (!regex.test(password)) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  return true;
};

module.exports = customerValidator;
