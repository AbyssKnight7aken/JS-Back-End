const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cubeManager = require('../managers/cubeManager.js')
const accessoryManager = require('../managers/accessoryManager.js');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers.js');

// Path /cubes/create


router.get('/create', isAuth, (req, res) => {
    console.log(cubeManager.getAll());
    res.render('cube/create');
});

router.post('/create', isAuth, async (req, res) => {
    //console.log(req.body);
    const NewCubeData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel),
        owner: req.user._id
    }
    await cubeManager.create(NewCubeData);
    res.redirect('/');
});

//DETAILS==============================================================================
router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('404');
    }

    const isOwner = cube.owner?.toString() === req.user?._id;

    res.render('cube/details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory',isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();
    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory',isAuth, async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;
    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
});

//EDIT CUBE
router.get('/:cubeId/edit',isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    if (cube.owner.toString() !== req.user?._id) {
        return res.redirect('/404')
    }

    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit',isAuth, async (req, res) => {
    //const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const cubeData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: req.body.difficultyLevel
    };

    await cubeManager.update(req.params.cubeId, cubeData);

    res.redirect(`/cubes/${req.params.cubeId}/details`);
});

// DELETE CUBE
router.get('/:cubeId/delete', isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete',isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    await cubeManager.delete(req.params.cubeId);

    res.redirect('/');
});


module.exports = router;