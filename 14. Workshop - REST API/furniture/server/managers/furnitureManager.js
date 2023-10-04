const Furniture = require('../models/Furniture');


exports.getAll = async() => {
    return await Furniture.find({});
}

exports.getByUserId = async(userId) => {
    return Furniture.find({ _ownerId: userId });
}

exports.getById = async(id) => {
    return Furniture.findById(id);
}

exports.create = async(item) => {
    return Furniture.create(item);
}

exports.update = async(id, item) => {
    const existing = await Furniture.findById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    return existing.save();
}

exports.deleteById = async(id) => {
    return Furniture.findByIdAndDelete(id);
}