const mongoose = require('mongoose');

const dbName = 'gaming-team';

const uri  = `mongodb://127.0.0.1:27017/${dbName}`;

async function dbConnect() {
    await mongoose.connect(uri);
}

module.exports = dbConnect;