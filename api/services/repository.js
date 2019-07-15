const Service = require("./Service");

exports.findByRange =async (page, size) => {
    const services = Service.find().skip(page).limit(size);
    return services;
}

exports.count = async () => {
    const count = await Service.collection.countDocuments();
    return count;
}

exports.findAll = async () => {
    const services = await Service.find();
    return services;
}