const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'The name should be at least 2 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'The URL should start with "http://" or "https://"!'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Minimal age is 1'],
        max: [100, 'Maximal age is 100'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'The description should be at least 5 characters long!'],
        maxLength: [50, 'The description should not be more than 50 characters long!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'The location should be at least 5 characters long!'],
        maxLength: [50, 'The location should not be more than 50 characters long!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    commentList: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: [true, 'Name is required'],
            ref: 'User'
        },
        comment: {
            type: String,
            required: [true, 'Comment message is required']
        }
    }]
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;


// Photo
// • name – string (required)
// • image – string (required)
// • age – number (required)
// • description – string (required)
// • location – string (required)
// • commentList – an array of objects containing the user's ID and the comment content: [ { userID: '1234',
// comment: 'Nice photo!'} ]
// • owner – object ID (a reference to the User model)
// Note: When a user comments a photo, their ID is added to that collection (commentList)

// You should make the following validations while creating or editing a photo post:
// • The name is required and should be at least 2 characters.
// • The photo image is required and should start with http:// or https://
// • The age is required and should be at least 1 and no longer than 100 characters.
// • The description is required and should be at least 5 and no longer than 50 characters.
// • The location is required and should be at least 5 and no longer than 50 characters.