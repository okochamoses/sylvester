const customerValidator = require("./customerValidation");
const Customer = require("./Customer");

exports.registerCustomer = (req, res) => {
  // get customer data
  const { body } = req;

  // validate it is correct
  const { errors, isEmpty } = customerValidator(body);
  if (!isEmpty) {
    return res.json({ code: 0, message: errors });
  }

  const customer = new Customer(body);

  // save to db
  customer.save();

  // return message to user
  return res.json({
    code: 0,
    message: "Operation Successful"
  });
};
