const Service = require("./Service");

exports.findByRange = async (page, size) => {
  const services = Service.find()
    .skip(page)
    .limit(size)
    .populate("subServices")
    .exec();
  return services;
};

exports.count = async () => {
  const count = await Service.collection.countDocuments();
  return count;
};

exports.findAll = async () => {
  const services = await Service.find()
    .populate("subServices")
    .exec();
  return services;
};

exports.findById = async id => {
  const service = await Service.findById(id);
  return service;
};

exports.findAndPopulateById = async id => {
  const service = await Service.findById(id)
    .populate("subServices")
    .exec();
  return service;
};
