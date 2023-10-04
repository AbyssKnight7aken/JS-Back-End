const router = require('express').Router();

const homeController = require('./controller/homeController');
const gameController = require('./controller/gameController');
const userController = require('./controller/userController');


router.use(homeController);
router.use('/users', userController);
router.use('/games', gameController);
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;