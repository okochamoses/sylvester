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
  const customer = await Customer.findOne({ phoneNumber });
  return customer;
};

const findByEmail = async email => {
  const customer = await Customer.findOne({ email });
  return customer;
};

const findAll = async () => {
  const customers = await Customer.find();
  return customers;
};

module.exports = {
  findById,
  findByUsername,
  findByPhoneNumber,
  findByEmail,
  findAll
};
