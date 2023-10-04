const homeController = require('express').Router();

const { errorMessagesExtractor } = require('../util/errorHelpers');
const animalManager = require('../managers/animalManager');


//HOME PAGE==============================================================
homeController.get('/', async (req, res) => {
    const animals = await animalManager.getRescent();
    res.render('home', {animals});
});


//DASHBOARD================================================================
homeController.get('/dashboard', async (req, res) => {
    const { name, platform } = req.body; // req.body is only for search
    try {
        const animals = await animalManager.getAll();
        console.log(animals);
        res.render('dashboard', { animals });
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('dashboard', { errorMessages });
    }
});


//SEARCH=====================================================================
homeController.get('/search', async (req, res) => {
    try {
        const { location } = req.body;

        const animals = await animalManager.getAll(location);
        //console.log(animals);
        res.render('search', animals);

    } catch (error) {
        res.redirect('/search');
    }
});


homeController.post('/search', async (req, res) => {
    try {
        const { location } = req.body;

        const animals = await animalManager.getAll(location);
        res.render('search', { animals });

    } catch (error) {
        res.redirect('/search');
    }
});



homeController.get('/404', (req, res) => {
    res.render('404');
});


module.exports = homeController;