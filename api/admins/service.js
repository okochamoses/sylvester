const Admin = require("./Admin");
const adminRepo = require("./repository");
const logger = require("../../config/logger");
const { hash, generatePassword } = require("../helper");
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