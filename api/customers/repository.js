const Customer = require("./Customer");

const findByUsername = async username => {
  const customer = await Customer.find({ username });
  return customer;
};

const findById = async id => {
  const customer = await Customer.findById(id);
  return customer;
};

const findByPhoneNumber = async phoneNumber => {
  const customer = await Customer.find({ phoneNumber });
  return customer;
};

const findByEmail = async email => {
  const customer = await Customer.find({ email });
  return customer;
};

module.exports = {
  findById,
  findByUsername,
  findByPhoneNumber,
  findByEmail
};
