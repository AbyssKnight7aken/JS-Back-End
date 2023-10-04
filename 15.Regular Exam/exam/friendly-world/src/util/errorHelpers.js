// const { MongooseError, Error } = require("mongoose");

// exports.errorMessagesExtractor = (error) => {
//     if (error instanceof MongooseError) {
//         return Object.values(error.errors).map(x => x.message);
//     } else if (error) {
//         return [error.message];
//     }
// }

//Multiple error messages
function errorMessagesExtractor(error) {
    
    if(error.name == 'ValidationError') {
        return Object.values(error.errors).map(v => v.message);
    } else if (Array.isArray(error)) {
        return error.map(x => x.msg)
    } else {
        return error.message.split('\n');
    }
}

module.exports = {
    errorMessagesExtractor
};




// Single Error Message:
// function parseError(error) {
//     let errors;
//     if(error.name == 'ValidationError') {
//         errors = Object.values(error.errors).map(v => v.message);
//     } else if (Array.isArray(error)) {
//         errors = errors = error.map(x => x.msg)
//     } else {
//         errors = error.message.split('\n');
//     }
//     console.log(errors);
//     return errors[0]
// }

// module.exports = {
//     parseError
// };