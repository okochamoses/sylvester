const Service = require("./Service");
const serviceRepo = require("./repository");
const logger = require("../../config/logger");

exports.getByRange = async (req, res) => {
  try {
    const { query } = req;
    let { page, size } = query;
    page = page === undefined ? null : page;
    size = size === undefined ? null : size;
    const record = (page - 1) * size;
    const services = await serviceRepo.findByRange(parseInt(record, 10), parseInt(size, 10));
    const count = await serviceRepo.count();

    return res.json({
      code: 0,
      message: "Operation Successful",
      data: services,
      total: count
    });
  } catch (err) {
    logger.info(err);
    return res.json({ code: 10, message: "Request processing error" });
  }
};

exports.add = async (req, res) => {
  try {
    const { body } = req;
    const service = new Service(body);
    const savedService = await service.save();
    if (!savedService) {
      return res.json({ code: 10, message: "Request processing error" });
    }
    return res.json({
      code: 0,
      message: "Operation Successful",
      data: savedService
    });
  } catch (error) {
    logger.info(error);
    return res.json({ code: 10, message: "Request processing error" });
  }
};

exports.getAll = async (req, res) => {
  const services = await serviceRepo.findAll();
  return res.json({
    code: 0,
    message: "Operation Successful",
    data: services
  });
};
