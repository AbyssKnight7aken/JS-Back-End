const Photo = require('../models/Photo');

exports.getAll = async () => {
    const result = await Photo.find({}).populate('owner').lean();
    return result;
}

exports.creare = (PhotoData) => {
    const newPhoto = new Photo(PhotoData);
    return newPhoto.save();
}

exports.getDetails = (id) => {
    const photo = Photo.findById(id).populate('owner');
    return photo
}

exports.update = async (id, data) => {
    const photo = await Photo.findById(id);

    photo.name = data.name;
    photo.age = Number(data.age);
    photo.description = data.description;
    photo.location = data.location;
    photo.image = data.image;

    return photo.save();
}

exports.delete = (id) => Photo.findByIdAndDelete(id);

exports.addComment = async (id, commentData) => {
    const photo = await Photo.findById(id);

    photo.commentList.push(commentData);

    return photo.save();
}

exports.getPhotosbyOwner = (userId) => Photo.find({ owner: userId });