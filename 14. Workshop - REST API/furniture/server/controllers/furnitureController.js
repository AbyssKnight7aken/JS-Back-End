const furnitureController = require('express').Router();

const furnitureManager = require('../managers/furnitureManager');
const { isAuth, auth } = require('../middlewares/authMiddleware')
const { parseError } = require('../util/parser');


furnitureController.get('/', async (req, res) => {
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await furnitureManager.getByUserId(userId);
    } else {
        items = await furnitureManager.getAll();
    }
    res.json(items);
});

furnitureController.post('/', isAuth, async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        const item = await furnitureManager.create(data);
        res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

furnitureController.get('/:id', async (req, res, next) => {
    const item = await furnitureManager.getById(req.params.id);
    res.json(item);
});

furnitureController.put('/:id', isAuth, async (req, res, next) => {
    const item = await furnitureManager.getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        const result = await furnitureManager.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

furnitureController.delete('/:id', isAuth, async (req, res) => {
    const item = await furnitureManager.getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await furnitureManager.deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

module.exports = furnitureController;