const router = require('express').Router();

const homeController = require('./controller/homeController');
const animalController = require('./controller/animalController');
const userController = require('./controller/userController');


router.use(homeController);
router.use('/users', userController);
router.use('/animals', animalController);
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;