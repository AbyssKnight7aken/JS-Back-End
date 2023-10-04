const homeController = require('express').Router();

const { errorMessagesExtractor } = require('../util/errorHelpers');
const gameManager = require('../managers/gameManager');


//HOME PAGE==============================================================
homeController.get('/', (req, res) => {
    res.render('home');
});


//CATALOGUE================================================================
homeController.get('/catalogue', async (req, res) => {
    const { name, platform } = req.body; // req.body is only for search
    try {
        const games = await gameManager.getAll(name, platform);
        console.log(games);
        res.render('catalog', { games });
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('/', { errorMessages });
    }
});


//SEARCH=====================================================================
homeController.get('/search', async (req, res) => {
    try {
        const { name, platform } = req.body;

        const games = await gameManager.getAll(name, platform);
        res.render('search', { games });

    } catch (error) {
        console.error(errorHandler(error).message);
        res.redirect('/search');
    }
});


homeController.post('/search', async (req, res) => {
    try {
        const { name, platform } = req.body;

        const games = await gameManager.getAll(name, platform);
        res.render('search', { games });

    } catch (error) {
        console.error(errorHandler(error).message);
        res.redirect('/search');
    }
});



homeController.get('/404', (req, res) => {
    res.render('404');
});


module.exports = homeController;