const gameController = require('express').Router();

const gameManager = require('../managers/gameManager');

const { isAuth } = require('../middlewares/authMiddleware');
const { populate } = require('../models/Game');
const { errorMessagesExtractor } = require('../util/errorHelpers');
const { getPlatformOptionsViewData } = require('../util/viewHelpers');



//CREATE================================================================
gameController.get('/create', isAuth, (req, res) => {
    res.render('game/create');
});

gameController.post('/create', isAuth, async (req, res) => {

    const newGameData = {
        platform: req.body.platform,
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        genre: req.body.genre,
        description: req.body.description,
        owner: req.user._id
    }

    try {

        // if (Object.values(newPhotoData).some(x => x === '')) {
        //     throw new Error(`All fields are required!`);
        // }

        const newGame = await gameManager.creare(newGameData);
        res.redirect('/catalogue');
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('game/create', { errorMessages, body: newGameData });
    }
});


//DETAILS================================================================
gameController.get('/:id/details', async (req, res) => {
    const game = await gameManager.getDetails(req.params.id).lean();
    game.isOwner = game.owner._id.toString() === req.user?._id.toString();
    game.isBougth = game.boughtBy.map(x => x.toString()).includes(req.user?._id.toString());
    console.log(game);
    res.render('game/details', { game });
});


//EDIT================================================================
gameController.get('/:id/edit', isAuth, async (req, res) => {
    const game = await gameManager.getDetails(req.params.id).lean();

    if (game.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to edit this game!'];
        return res.render('game/details', { game, errorMessages });
    }

    const platforms = getPlatformOptionsViewData(game.platform);

    res.render('game/edit', { game, platforms });
});

gameController.post('/:id/edit', isAuth, async (req, res) => {
    const game = await gameManager.getDetails(req.params.id).lean();
    console.log(req.params.id);
    if (game.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to edit this game!'];
        return res.render('game/details', { game, errorMessages });
    }

    try {

        // if (Object.values(game).some(x => x === '')) {
        //     throw new Error(`All fields are required!`);
        // }

        await gameManager.update(req.params.id, req.body);
        res.redirect(`/games/${req.params.id}/details`);
    } catch (err) {
        req.body._id = req.params.id;
        const errorMessages = errorMessagesExtractor(err);
        res.render('game/edit', { errorMessages, game: req.body });
    }
});


//DELETE================================================================
gameController.get('/:id/delete', isAuth, async (req, res) => {
    const game = await gameManager.getDetails(req.params.id).lean();

    if (game.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to delete this game!'];
        return res.render('game/details', { game, errorMessages });
    }

    try {
        await gameManager.delete(req.params.id);
        res.redirect('/catalogue');
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('404', { errorMessages });
    }

});


gameController.get('/:id/buy', async (req, res) => {
    const game = await gameManager.getDetails(req.params.id).lean();
    const gameId = req.params.id;
    const userId = req.user._id;

    try {

        // if (game.owner.toString() != req.user._id.toString()
        //     && game.boughtBy.map(x => x.toString()).includes(req.user._id.toString()) == false) {
        // }

        await gameManager.buyGame(gameId, userId);
        res.redirect(`/games/${gameId}/details`);
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        return res.render('game/details', { game, errorMessages });
    }


});


// //COMMENT==================================================================
// gameController.post('/:id/comments', isAuth, async (req, res) => {
//     const photoId = req.params.id;
//     const { comment } = req.body;
//     const user = req.user._id;
//     //console.log(req.body);
//     try {
//         await photoManager.addComment(photoId, { comment, user });

//         res.redirect(`/photos/${photoId}/details`);
//     } catch (err) {
//         const errorMessages = errorMessagesExtractor(err);
//         //res.render('photo/details', { photo });
//         res.redirect(`/photos/${photoId}/details`);
//     }
// })

module.exports = gameController;