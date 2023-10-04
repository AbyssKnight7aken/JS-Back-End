const animalController = require('express').Router();

const animalManager = require('../managers/animalManager');

const { isAuth } = require('../middlewares/authMiddleware');
const { populate } = require('../models/Animal');
const { errorMessagesExtractor } = require('../util/errorHelpers');
//const { getPlatformOptionsViewData } = require('../util/viewHelpers');



//CREATE================================================================
animalController.get('/create', isAuth, (req, res) => {
    res.render('animal/create');
});

animalController.post('/create', isAuth, async (req, res) => {

    const newAnimalData = {
        name: req.body.name,
        years: Number(req.body.years),
        kind: req.body.kind,
        image: req.body.image,
        need: req.body.need,
        location: req.body.location,
        description: req.body.description,
        owner: req.user._id
    }

    try {

        // if (Object.values(newPhotoData).some(x => x === '')) {
        //     throw new Error(`All fields are required!`);
        // }

        const newAnimal = await animalManager.creare(newAnimalData);
        res.redirect('/dashboard');
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        console.log(errorMessages);
        res.render('animal/create', { errorMessages, body: newAnimalData });
    }
});


//DETAILS================================================================
animalController.get('/:id/details', async (req, res) => {
    const animal = await animalManager.getDetails(req.params.id).lean();

    animal.isOwner = animal.owner._id.toString() === req.user?._id.toString();
    animal.isDonated = animal.donations.map(x => x.toString()).includes(req.user?._id.toString());
    console.log(animal);
    res.render('animal/details', { animal });
});


//EDIT================================================================
animalController.get('/:id/edit', isAuth, async (req, res) => {
    const animal = await animalManager.getDetails(req.params.id).lean();

    if (animal.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to edit this animal!'];
        return res.render('animal/details', { animal, errorMessages });
    }

    res.render('animal/edit', { animal });
});

animalController.post('/:id/edit', isAuth, async (req, res) => {
    const animal = await animalManager.getDetails(req.params.id).lean();
    console.log(req.params.id);
    if (animal.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to edit this animal!'];
        return res.render('animal/details', { animal, errorMessages });
    }

    try {

        // if (Object.values(game).some(x => x === '')) {
        //     throw new Error(`All fields are required!`);
        // }

        await animalManager.update(req.params.id, req.body);
        res.redirect(`/animals/${req.params.id}/details`);
    } catch (err) {
        req.body._id = req.params.id;
        const errorMessages = errorMessagesExtractor(err);
        res.render('animal/edit', { errorMessages, animal: req.body });
    }
});


//DELETE================================================================
animalController.get('/:id/delete', isAuth, async (req, res) => {
    const animal = await animalManager.getDetails(req.params.id).lean();

    if (animal.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to delete this animal!'];
        return res.render('animal/details', { animal, errorMessages });
    }

    try {
        await animalManager.delete(req.params.id);
        res.redirect('/dashboard');
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('404', { errorMessages });
    }

});


animalController.get('/:id/donate', async (req, res) => {
    const animal = await animalManager.getDetails(req.params.id).lean();
    const animalId = req.params.id;
    const userId = req.user._id;

    try {

        await animalManager.donate(animalId, userId);
        res.redirect(`/animals/${animalId}/details`);
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        return res.render('animal/details', { animal, errorMessages });
    }


});




module.exports = animalController;