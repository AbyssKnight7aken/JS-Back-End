const mongoose = require('mongoose');

//TODO change database accroding to assignment:
const CONNECTION_STRING = 'mongodb://localhost:27017/gaming-team';

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected');
        
    } catch (err){
        console.log(err);
        //process.exit(1);
    }
}