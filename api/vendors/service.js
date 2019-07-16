const Vendor = require("./Vendor");
const Address = require("../addresses/Address");
const vendorRepo = require("./repository");
const addressRepo = require("../addresses/repository");
const vendorValidator = require("./validation");
const logger = require("../../config/logger");
const { findLongLat } = require("../../config/maps");
const { sendMail, messages } = require("../../config/mailer");
const { hash, generatePassword, comparePassword, generateToken } = require("../helper");

exports.register = async (req, res) => {
  try {
    const { body } = req;

    const { errors, isEmpty } = vendorValidator(body);

    if (!isEmpty) {
      return res.json({ code: 0, message: errors });
    }

    let vendor;
    // Check if email already exists
    vendor = await vendorRepo.findByEmail(body.email);
    if (vendor) {
      return res.json({ code: 0, message: "Email already exists" });
    }

    // Check if phone number already exists
    vendor = await vendorRepo.findByPhoneNumber(body.phoneNumber);
    if (vendor) {
      return res.json({ code: 0, message: "Phone number already exists" });
    }

    // Check if phone number already exists
    vendor = await vendorRepo.findByUsername(body.username);
    if (vendor) {
      return res.json({ code: 0, message: "Username already exists" });
    }

    // check if vendor email, username or phone already exists

    vendor = new Vendor(body);
    vendor.password = hash(body.password);
    vendor.save();

    return res.json({ code: 0, message: "Operation Successful" });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await vendorRepo.findAll();
    return res.json({ code: 0, data: vendors });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { body } = req;
    let vendor;
    if (body.username !== undefined) {
      vendor = await vendorRepo.findByUsername(body.username);
    } else {
      vendor = await vendorRepo.findByEmail(body.email);
    }

    // check if vendor exists
    if (!vendor) {
      return res.json({ code: 10, message: "We couldn't find a user matching those credentials!" });
    }

    const randomPassword = generatePassword();
    vendor.password = await hash(randomPassword);
    vendor.mustChangePassword = true;
    vendor.save();

    // send email to user
    sendMail(vendor.email, "Password reset", messages.resetPassword(randomPassword));

    return res.json({ code: 0, message: "A new password has been  sent to your email" });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    const vendor = await vendorRepo.findByUsername(username);
    if (!vendor) {
      return res.json({ code: 10, message: "The username entered is not associated with any account" });
    }

    if (!comparePassword(oldPassword, vendor.password)) {
      return res.json({ code: 10, message: "You have entered an incorrect password" });
    }

    const password = hash(newPassword);
    vendor.password = password;
    vendor.save();

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
    const vendor = await vendorRepo.findByUsername(username);

    // isCustomer vailid
    if (!vendor) {
      return res.json({ code: 30, message: "Username / Password validation failed" });
    }

    // compare password
    if (!comparePassword(password, vendor.password)) {
      return res.json({ code: 30, message: "Username / Password validation failed" });
    }
    const payload = {
      id: vendor.id,
      username: vendor.username,
      firstName: vendor.firstName,
      lastName: vendor.lastName
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
    const vendor = await vendorRepo.update(user.id, body);

    if (!vendor) {
      return res.json({ code: 10, message: "Failed to update vendor profile" });
    }

    return res.json({ code: 0, message: "Operation successful", data: vendor });
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
    const vendor = await vendorRepo.findById(user.id);
    vendor.address = address;
    vendor.save();

    return res.json({ code: 0, message: "Operation Successful", data: saved });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { body, user } = req;
    const vendor = await vendorRepo.findById(user.id);

    // get location from address
    const { lng, lat } = await findLongLat(`${body.address}, ${body.lga} ${body.state}`);
    body.longitude = lng;
    body.latitude = lat;

    if (!vendor.address !== body.id) {
      return res.json({ code: 10, message: "Address is not associated with user" });
    }

    const address = await addressRepo.update(body.id, body);

    return res.json({ code: 0, message: "Operation Successful", data: address });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const vendor = await vendorRepo.get(req.user.id);
    return res.json({ code: 0, message: "Operation Successful", data: vendor });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};
