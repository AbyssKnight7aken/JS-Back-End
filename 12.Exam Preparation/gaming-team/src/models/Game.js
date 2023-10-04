const mongoose = require('mongoose');
const { platforms } = require('../config/options');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [4, 'The name should be at least 4 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'The URL should start with "http://" or "https://"!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [1, 'The price should be a positive number!'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [2, 'The genre should be at least 2 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'The description should be at least 10 characters long!'],
    },
    platform: {
        type: String,
        required: [true, 'Platform is required!'],
        enum: platforms
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;