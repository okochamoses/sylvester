const Admin = require("./Admin");

const findByUsername = async username => {
  const admin = await Admin.findOne({ username });
  return admin;
};

const findById = async id => {
  const admin = await Admin.findById(id);
  return admin;
};

const findByEmail = async email => {
  const admin = await Admin.findOne({ email });
  return admin;
};

const findAll = async () => {
  const admins = await Admin.find();
  return admins;
};

const update = async (id, body) => {
  const admin = await Admin.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
  return admin;
};

module.exports = {
  findById,
  findByUsername,
  findByEmail,
  findAll,
  update
};
