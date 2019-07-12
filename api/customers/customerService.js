const customerValidator = require("./customerValidation");
const Customer = require("./Customer");
const customerRepo = require("./repository");
const logger = require("../../config/logger");

exports.registerCustomer = async (req, res) => {
  try {
    const { body } = req;

    const { errors, isEmpty } = customerValidator(body);

    if (!isEmpty) {
      return res.json({ code: 0, message: errors });
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
