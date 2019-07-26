const customerValidator = require("./validation");
const Customer = require("./Customer");
const Address = require("../addresses/Address");
const customerRepo = require("./repository");
const addressRepo = require("../addresses/repository");
const logger = require("../../config/logger");
const { hash, generatePassword, comparePassword, generateToken } = require("../helper");
const { sendMail, messages } = require("../../config/mailer");
const { findLongLat } = require("../../config/maps");

exports.registerCustomer = async (req, res) => {
  try {
    const { body } = req;

    const { errors, isEmpty } = customerValidator(body);

    if (!isEmpty) {
      const err = Object.keys(errors)[0];
      return res.json({ code: 10, message: errors[err] });
    }

    let customer;
    // Check if email already exists
    customer = await customerRepo.findByEmail(body.email);
    if (customer) {
      return res.json({ code: 0, message: "Email already exists" });
    }

    // Check if phone number already exists
    customer = await customerRepo.findByPhoneNumber(body.phoneNumber);
    if (customer) {
      return res.json({ code: 0, message: "Phone number already exists" });
    }

    // Check if phone number already exists
    customer = await customerRepo.findByUsername(body.username);
    if (customer) {
      return res.json({ code: 0, message: "Username already exists" });
    }

    // check if customer email, username or phone already exists

    customer = new Customer(body);
    customer.password = hash(body.password);
    customer.save();

    return res.json({ code: 0, message: "Operation Successful" });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await customerRepo.findAll();
    return res.json({ code: 0, data: customers });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { body } = req;
    let customer;
    if (body.username !== undefined) {
      customer = await customerRepo.findByUsername(body.username);
    } else {
      customer = await customerRepo.findByEmail(body.email);
    }

    // check if customer exists
    if (!customer) {
      return res.json({ code: 10, message: "We couldn't find a user matching those credentials!" });
    }

    const randomPassword = generatePassword();
    customer.password = await hash(randomPassword);
    customer.mustChangePassword = true;
    customer.save();

    // send email to user
    sendMail(customer.email, "Password reset", messages.resetPassword(randomPassword));

    return res.json({ code: 0, message: "A new password has been  sent to your email" });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    const customer = await customerRepo.findByUsername(username);
    if (!customer) {
      return res.json({ code: 10, message: "The username entered is not associated with any account" });
    }

    if (!comparePassword(oldPassword, customer.password)) {
      return res.json({ code: 10, message: "You have entered an incorrect password" });
    }

    const password = hash(newPassword);
    customer.password = password;
    customer.save();

    return res.json({ code: 0, message: "Operation Successful" });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.authenticate = async (req, res) => {
  try {
    // get user id
    const { username, password } = req.body;
    const customer = await customerRepo.findByUsername(username);

    // isCustomer vailid
    if (!customer) {
      return res.json({ code: 30, message: "Username / Password validation failed" });
    }

    // compare password
    if (!comparePassword(password, customer.password)) {
      return res.json({ code: 30, message: "Username / Password validation failed" });
    }
    const payload = {
      id: customer.id,
      username: customer.username,
      firstName: customer.firstName,
      lastName: customer.lastName
    };
    const token = generateToken(payload);
    return res.json({ code: 0, message: "Operation Successful", data: token });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { body, user } = req;
    // TODO: Check if username, password, phone are being updated and remove
    const customer = await customerRepo.update(user.id, body);

    if (!customer) {
      return res.json({ code: 10, message: "Failed to update customer profile" });
    }

    return res.json({ code: 0, message: "Operation successful", data: customer });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { body, user } = req;

    const address = new Address(body);
    // get location from address
    const { lng, lat } = await findLongLat(`${address.address}, ${address.lga} ${address.state}`);
    address.longitude = lng;
    address.latitude = lat;

    const saved = await address.save();
    if (!saved) {
      return res.json({ code: 10, message: "Unable to save address" });
    }
    const customer = await customerRepo.findById(user.id);
    customer.addresses.push(address);
    customer.save();

    return res.json({ code: 0, message: "Operation Successful", data: saved });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { body, user } = req;
    const customer = await customerRepo.findById(user.id);

    if (!customer.addresses.includes(body.id)) {
      return res.json({ code: 10, message: "Address is not associated with user" });
    }

    const address = await addressRepo.update(body.id, body);

    return res.json({ code: 0, message: "Operation Successful", data: address });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};
