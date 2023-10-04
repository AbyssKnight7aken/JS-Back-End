const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');
const {parseToken} = require('../managers/userManager');

exports.auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const decodedToken = await parseToken(token);
            req.user = decodedToken;
            req.token = token;
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({
                message: 'You are not authorized!'
            });
            return res.redirect('/users/login');
        }
    } else {
        next();
    }
}

exports.isAuth = async (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }
    next();
}