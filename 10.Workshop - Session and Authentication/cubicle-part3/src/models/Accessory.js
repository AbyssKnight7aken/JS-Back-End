const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String
})

const Accessoty = mongoose.model('Accessory', AccessorySchema);

module.exports = Accessoty;