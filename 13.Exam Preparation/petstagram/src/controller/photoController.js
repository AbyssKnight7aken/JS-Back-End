const photoController = require('express').Router();

const photoManager = require('../managers/photoManager');

const { isAuth } = require('../middlewares/authMiddleware');
const { populate } = require('../models/Photo');
const { errorMessagesExtractor } = require('../util/errorHelpers');

//CATALOGUE================================================================
photoController.get('/catalogue', async (req, res) => {
    try {
        const allPhotos = await photoManager.getAll();
        //console.log(allPhotos);
        res.render('photo/catalog', { allPhotos });
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('404', { errorMessages });
    }
});

//CREATE================================================================
photoController.get('/create', isAuth, (req, res) => {
    res.render('photo/create');
});

photoController.post('/create', isAuth, async (req, res) => {

    const newPhotoData = {
        name: req.body.name,
        age: req.body.age,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image,
        owner: req.user._id
    }

    try {

        // if (Object.values(newPhotoData).some(x => x === '')) {
        //     throw new Error(`All fields are required!`);
        // }

        const newPhoto = await photoManager.creare(newPhotoData);
        res.redirect('/photos/catalogue');
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('photo/create', { errorMessages, newPhotoData });
    }
});


//EDIT================================================================
photoController.get('/:id/edit', isAuth, async (req, res) => {
    const photo = await photoManager.getDetails(req.params.id).lean();

    if (photo.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to edit this photo!'];
        return res.render('photo/details', { photo, errorMessages });
    }

    res.render('photo/edit', { photo });
});

photoController.post('/:id/edit', isAuth, async (req, res) => {
    const photo = await photoManager.getDetails(req.params.id).lean();
    console.log(req.params.id);
    if (photo.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to edit this photo!'];
        return res.render('photo/details', { photo, errorMessages });
    }

    try {

        if (Object.values(photo).some(x => x === '')) {
            throw new Error(`All fields are required!`);
        }

        await photoManager.update(req.params.id, req.body);
        res.redirect(`/photos/${req.params.id}/details`);
    } catch (err) {
        req.body._id = req.params.id;
        const errorMessages = errorMessagesExtractor(err);
        res.render('photo/edit', { errorMessages, photo: req.body });
    }


});


//DETAILS================================================================
photoController.get('/:id/details', async (req, res) => {
    const photo = await photoManager.getDetails(req.params.id).populate('commentList.user').lean();
    photo.isOwner = photo.owner._id.toString() === req.user?._id.toString();
    //console.log(photo);
    res.render('photo/details', { photo });
});


//DELETE================================================================
photoController.get('/:id/delete', isAuth, async (req, res) => {
    const photo = await photoManager.getDetails(req.params.id).lean();

    if (photo.owner._id.toString() !== req.user?._id.toString()) {
        const errorMessages = ['You have no permission to delete this photo!'];
        return res.render('photo/details', { photo, errorMessages });
    }

    try {
        await photoManager.delete(req.params.id);
        res.redirect('/photos/catalogue');
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        res.render('404', { errorMessages });
    }

});


//COMMENT==================================================================
photoController.post('/:id/comments', isAuth, async (req, res) => {
    const photoId = req.params.id;
    const { comment } = req.body;
    const user = req.user._id;
    //console.log(req.body);
    try {
        await photoManager.addComment(photoId, { comment, user });

        res.redirect(`/photos/${photoId}/details`);
    } catch (err) {
        const errorMessages = errorMessagesExtractor(err);
        //res.render('photo/details', { photo });
        res.redirect(`/photos/${photoId}/details`);
    }
})

module.exports = photoController;