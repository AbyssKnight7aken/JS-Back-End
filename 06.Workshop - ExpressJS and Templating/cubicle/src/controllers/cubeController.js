const router = require('express').Router();

const cubeManager = require('../managers/cubeManager.js')

// Path /cubes/create


router.get('/create', (req, res) => {
    console.log(cubeManager.getAll());
    res.render('create');
});

router.post('/create', (req, res) => {
    console.log(req.body);
    const NewCubeData = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    }
    cubeManager.create(NewCubeData);
    res.redirect('/');
});

router.get('/:cubeId/details', (req, res) => {
    const cube = cubeManager.getOne(req.params.cubeId);
    
    if (!cube) {
        return res.redirect('404');
    }
    res.render('details', { cube });
});

module.exports = router;