const validator = require("validator");

const vendorValidator = vendor => {
  const errors = {};

  if (!validator.isEmail(vendor.email)) {
    errors.email = "Please enter a valid email;";
  }

  if (!validator.isAlpha(vendor.firstName)) {
    errors.firstName = "First name must be only alphabets";
  }

  if (!validator.isAlpha(vendor.lastName)) {
    errors.lastName = "Last name must be only alphabets";
  }

  if (vendor.firstName.length < 2 || vendor.firstName.length > 32) {
    errors.firstName = "Please enter a valid name";
  }

  if (vendor.lastName.length < 2 || vendor.lastName.length > 32) {
    errors.lastName = "Please enter a valid name";
  }

  if (vendor.username.length < 2 || vendor.username.length > 32) {
    errors.username = "Please enter a valid username";
  }

  if (!validator.isMobilePhone(vendor.phoneNumber, ["ar-SA", "en-NG"])) {
    errors.phoneNumber = "Please enter valid phone number";
  }

  const regex = RegExp(/^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,}\S$/, "g");
  if (!regex.test(vendor.password)) {
    errors.password = "Password must be alphanumeric";
  }

  if (vendor.password.length < 6) {
    errors.password = "Password must be at leat 6 characters";
  }

  const isEmpty = Object.keys(errors).length === 0;
  return { errors, isEmpty };
};

module.exports = vendorValidator;
