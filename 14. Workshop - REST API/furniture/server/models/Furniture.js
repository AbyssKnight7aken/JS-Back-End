const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'Make is required!'],
        minlength: [3, 'Make must be at least 3 characters long']
    },
    model: {
        type: String,
        required: [true, 'Model is required!'],
        minlength: [3, 'Model must be at least 3 characters long']
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        validate: {
            validator: value => value >= 1950 && value <= 2050,
            message: 'Year must be between 1950 and 2050'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0.01, 'Price must be a positive number']
    },
    img: {
        type: String,
        required: [true, 'Image is required!'],
        required: [true, 'Image URL is required']
    },
    material: {
        type: String,
        default: ''
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;