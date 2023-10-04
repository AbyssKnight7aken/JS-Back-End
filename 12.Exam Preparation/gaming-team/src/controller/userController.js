const userController = require('express').Router();
const userManager = require('../managers/userManager');
const photoManager = require('../managers/gameManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { errorMessagesExtractor } = require('../util/errorHelpers');

//LOGIN================================================================
userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userManager.login(email, password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        const errorMessages = errorMessagesExtractor(err);
        res.render('user/login', { body: { email: req.body.email }, errorMessages });
    }
});


//REGISTER==============================================================
userController.get('/register', (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    console.log(req.body);

    try {
        // if (username == '' || email == '' || password == '') {
        //     throw new Error('All fields are required!');
        // }

        // if (req.body.username.length < 2) {
        //     throw new Error('Username must be at least 2 characters long!');
        // }

        // if (req.body.email.length < 10) {
        //     throw new Error('Email must be at least 10 characters long!');
        // }

        // if (req.body.password.length < 4) {
        //     throw new Error('Passwords must be at least 4 characters long!');
        // }

        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords does not match!');
        }

        const newUser = await userManager.register({ username, email, password, repeatPassword });
        //res.cookie('token', token)
        res.redirect('/');

    } catch (err) {
        //console.log(err);
        const errorMessages = errorMessagesExtractor(err);
        console.log(errorMessages);
        res.render('user/register', { body: { email: req.body.email, username: req.body.username, }, errorMessages });
    }
});


// //PROFILE==============================================================
// userController.get('/:userId/profile', isAuth, async (req, res) => {
//     const photos = await photoManager.getPhotosbyOwner(req.user._id).lean();
//     res.render('user/profile', { photos, photoCount: photos.length });
// });


//LOGOUT==============================================================
userController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = userController;