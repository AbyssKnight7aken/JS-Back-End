const router = require('express').Router();

const homeController = require('./controller/homeController');
const photoController = require('./controller/photoController');
const userController = require('./controller/userController');


router.use(homeController);
router.use('/users', userController);
router.use('/photos', photoController);
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;