const Animal = require('../models/Animal');

exports.getAll = async (location) => {
    let result = await Animal.find({}).lean();

    if (location) {
        result = result.filter(animal => animal.location.toLowerCase().includes(location.toLowerCase()));
    }

    return result;
}

exports.getRescent = () => {
    return Animal.find({}).sort({ _id: -1 }).limit(3).lean();
}

exports.creare = (animalData) => {
    const newAnimal = new Animal(animalData);
    return newAnimal.save();
}

exports.getDetails = (id) => {
    const animal = Animal.findById(id).populate('owner');
    return animal;
}

exports.update = async (id, data) => {
    const animal = await Animal.findById(id);

    animal.name = data.name;
    animal.years = data.years;
    animal.kind = data.kind;
    animal.image = data.image;
    animal.need = data.need;
    animal.location = data.location;
    animal.description = data.description;

    return animal.save();
}

exports.delete = (id) => Animal.findByIdAndDelete(id);

exports.donate = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);
    if (animal.donations.includes(userId)) {
        throw new Error('You already donated!');
    }

    animal.donations.push(userId);
    await animal.save();
}

exports.getPhotosbyOwner = (userId) => Photo.find({ owner: userId });