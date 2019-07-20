// add
// findById
// findAll
// update
// disable

const Vendor = require("./Vendor");

exports.findByUsername = async username => {
  const vendor = await Vendor.findOne({ username });
  return vendor;
};

exports.findById = async id => {
  const vendor = await Vendor.findById(id);
  return vendor;
};

exports.findByPhoneNumber = async phoneNumber => {
  const vendor = await Vendor.findOne({ phoneNumber });
  return vendor;
};

exports.findByEmail = async email => {
  const vendor = await Vendor.findOne({ email });
  return vendor;
};

exports.findAll = async () => {
  const vendors = await Vendor.find();
  return vendors;
};

exports.update = async (id, body) => {
  const vendor = await Vendor.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
  return vendor;
};

exports.get = async id => {
  const vendor = await Vendor.findById(id)
    .populate("service")
    .populate("address")
    .exec();
  return vendor;
};

exports.getVendorsByService = async id => {
  const vendors = await Vendor.find({ service: id, status: true });
  return vendors;
};

exports.getVendorsByServiceAndState = async (id, state) => {
  const vendors = await Vendor.find({ service: id, status: true })
    .populate({
      path: "address",
      match: { state }
    })
    .exec();
  return vendors;
};
