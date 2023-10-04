const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const User = require("../models/User");

const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const { email, password, repeatPassword } = userData;
    
    const existingEmail = await User.findOne({ email }).collation({locale:'en', strength: 2});
    if (existingEmail) {
        throw new Error(`The email ${existingEmail.email} is already taken!`);
    }

    const newUserser = await User.create({ email, password });

    const token = await createSession(newUserser);
    return token;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Incorrect email or password!');
    }

    console.log(`Successfully logged in as ${user.email}`);

    const token = await createSession(user);
    return token;
}


const createSession = async ({ _id, email }) => {

    //add username to payload, if required according to the User model!!!
    const payload = {
        _id,
        email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
};