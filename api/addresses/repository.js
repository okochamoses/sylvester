const Address = require("./Address");

const findById = async id => {
  const address = await Address.findById(id);
  return address;
};

const update = async (id, body) => {
  const address = await Address.findOneAndUpdate(id, { $set: body }, { new: true });
  return address;
};

module.exports = { findById, update };
