const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const User = require("../models/User");

const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const { username, email, password, repeatPassword } = userData;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        throw new Error(`The name ${existingUsername} is already taken!`);
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw new Error(`The email ${existingEmail} is already taken!`);
    }

    const newUserser = await User.create({ username, email, password });

    const token = await createSession(newUserser);
    return token;
};

exports.login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Incorrect username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Incorrect username or password!');
    }

    console.log(`Successfully logged in as ${user.username}`);

    const token = await createSession(user);
    return token;
}


const createSession = async ({ _id, email, username }) => {
    const payload = {
        _id,
        email,
        username,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
};