const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const { body, validationResult } = require('express-validator');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    // TODO replace with actual view by assignment
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register',
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers'),
    body('email')
        .isLength({ min: 10 }).withMessage('Email must be at least 10 characters long'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password should be at least 4 characters long'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            if (req.body.password != req.body.repass) {
                throw new Error('Passwords does not match');
            }

            const token = await register(req.body.username, req.body.email, req.body.password);

            // TODO check assignment to see if register creates session
            res.cookie('token', token);
            res.redirect('/'); //TODO replace with redirect by assignment
        } catch (error) {
            const errors = parseError(error);

            // TODO add error display to actual template from assignment
            res.render('register', {
                title: 'Register Page',
                errors,
                body: {
                    username: req.body.username,
                    email: req.body.email,
                }
            });
        }
    });


authController.get('/login', (req, res) => {
    // TODO replace with actual view by assignment
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); 
    } catch (error) {
        const errors = parseError(error);

        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                email: req.body.email
            }
        });
    }
})


authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;