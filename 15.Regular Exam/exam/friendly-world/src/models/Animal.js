const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'The name should be at least 2 characters long!'],
    },
    years: {
        type: Number,
        required: [true, 'Years is required!'],
        min: [1, 'The years should be a positive number!'],
        max: [100, 'The years should not be more than 100!'],
    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minLength: [3, 'The genre should be at least 3 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'The URL should start with "http://" or "https://"!'],
    },
    need: {
        type: String,
        required: [true, 'Need is required!'],
        minLength: [3, 'The need should be at least 3 characters long!'],
        maxLength: [20, 'The need should not be more than 20 characters long!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'The location should be at least 5 characters long!'],
        maxLength: [15, 'The location should not be more than 15 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'The description should be at least 5 characters long!'],
        maxLength: [50, 'The description should not be more than 50 characters long!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;