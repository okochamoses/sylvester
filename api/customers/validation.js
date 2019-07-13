const validator = require("validator");

const customerValidator = customer => {
  const errors = {};

  if (!validator.isEmail(customer.email)) {
    errors.email = "Please enter a valid email;";
  }

  if (!validator.isAlpha(customer.firstName)) {
    errors.firstName = "First name must be only alphabets";
  }

  if (!validator.isAlpha(customer.lastName)) {
    errors.lastName = "Last name must be only alphabets";
  }

  if (customer.firstName.length < 2 || customer.firstName.length > 32) {
    errors.firstName = "Please enter a valid name";
  }

  if (customer.lastName.length < 2 || customer.lastName.length > 32) {
    errors.lastName = "Please enter a valid name";
  }

  if (customer.username.length < 2 || customer.username.length > 32) {
    errors.username = "Please enter a valid username";
  }

  if (!validator.isMobilePhone(customer.phoneNumber, ["ar-SA", "en-NG"])) {
    errors.phoneNumber = "Please enter valid phone number";
  }

  const regex = RegExp(/^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,}\S$/, "g");
  if (!regex.test(customer.password)) {
    errors.password = "Password must be alphanumeric";
  }

  if (customer.password.length < 6) {
    errors.password = "Password must be at leat 6 characters";
  }

  const isEmpty = Object.keys(errors).length === 0;
  return { errors, isEmpty };
};

module.exports = customerValidator;
