const Customer = require("./Customer");

const findByUsername = async username => {
  const customer = await Customer.findOne({ username });
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

const update = async (id, body) => {
  const customer = await Customer.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
  return customer;
};

const getProfile = async id => {
  const customer = await Customer.findById(id).populate("addresses");
  return customer;
};

module.exports = {
  findById,
  findByUsername,
  findByPhoneNumber,
  findByEmail,
  findAll,
  update,
  getProfile
};
