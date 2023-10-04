const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true
            next();
        } catch (err) {
            console.log(err);
            res.clearCookie('token');
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