const userController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util/parser');

const userManager = require('../managers/userManager');


userController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    async (req, res) => {
        //const { email, password } = req.body;

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const result = await userManager.register(req.body.email, req.body.password);
            res.cookie('token', result.accessToken);
            res.json(result);
        } catch (err) {
            const message = parseError(err);
            res.status(400).json({ message });
        }
    });


userController.post('/login', async (req, res) => {
    try {
        const result = await userManager.login(req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(401).json({ message });
    }
});


userController.get('/logout', async (req, res) => {
    //TODO: invalidate token...
    const token = req.token;
    await userManager.logout(token);
    res.status(204).end();
})

module.exports = userController;