const Admin = require("./Admin");
const adminRepo = require("./repository");
const logger = require("../../config/logger");
const { hash, generatePassword, comparePassword, generateToken } = require("../helper");
const { sendMail, messages } = require("../../config/mailer");

exports.register = async (req, res) => {
  try {
    const { body } = req;

    // TODO: validate admin
    let existingAdmin;

    existingAdmin = await adminRepo.findByEmail(body.email);
    if (existingAdmin) {
      return res.json({ code: 10, message: "A user with that email already exists" });
    }

    existingAdmin = await adminRepo.findByUsername(body.username);
    if (existingAdmin) {
      return res.json({ code: 10, message: "A user with that username already exists" });
    }

    const admin = new Admin(body);

    const password = generatePassword();
    admin.password = hash(password);
    const savedAdmin = await admin.save();

    if (!savedAdmin) {
      return res.json({ code: 10, message: "Something went wrong! Please retry" });
    }

    sendMail(body.email, "Registration Details", messages.adminRegistration(password, admin.username));
    return res.json({ code: 0, message: "Operation Successful", data: savedAdmin });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await adminRepo.findAll();
    return res.json({ code: 0, data: admins });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.authenticate = async (req, res) => {
  try {
    // get user id
    const { username, password } = req.body;
    const admin = await adminRepo.findByUsername(username);

    // isCustomer vailid
    if (!admin) {
      return res.json({ code: 30, message: "Username / Password validation failed" });
    }

    // compare password
    if (!comparePassword(password, admin.password)) {
      return res.json({ code: 30, message: "Username / Password validation failed" });
    }

    // check user isActive is active
    if (admin.isActive === false) {
      return res.json({ code: 30, message: "Please contact the admin to enable our account" });
    }
    const payload = {
      id: admin.id,
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
      accessLevel: admin.accessLevel
    };
    const token = generateToken(payload, "admin");
    return res.json({ code: 0, message: "Operation Successful", data: token });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.viewProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const admin = await adminRepo.findById(id);
    return res.json({ code: 0, message: "Operation Successful", data: admin });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.enable = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminRepo.findById(id);
    admin.isActive = true;
    const saved = await admin.save();
    return res.json({ code: 0, message: "Operation Successful", data: saved });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};

exports.disable = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminRepo.findById(id);
    admin.isActive = false;
    const saved = await admin.save();
    return res.json({ code: 0, message: "Operation Successful", data: saved });
  } catch (error) {
    logger.error(error);
    return res.json({ code: 10, message: "Operation processing error" });
  }
};
