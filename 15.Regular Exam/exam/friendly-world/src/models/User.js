const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'The email should be at least 10 characters long!'],
        unique: [true, 'The specified email is already in use!'],
        // validate: {
        //     validator: async function (email) {
        //         const user = await this.constructor.findOne({ email });
        //         if (user) {
        //             if (this.id === user.id) {
        //                 return true;
        //             }
        //             return false;
        //         }
        //         return true;
        //     },
        //     message: props => 'The specified email is already in use!'
        // },
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'The password should be at least 4 characters long!'],
    }
});

// userSchema.index({ email: 1}, {
//     collation: {
//         locale: 'en',
//         strength: 2,
//     }
// });

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password missmatch!');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;