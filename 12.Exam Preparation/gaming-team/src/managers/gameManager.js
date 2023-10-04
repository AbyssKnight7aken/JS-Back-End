const Game = require('../models/Game');

exports.getAll = async (name, platform) => {
    let result = await Game.find({}).lean();

    if (name) {
        result = result.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (platform) {
        result = result.filter(game => game.platform.toLowerCase().includes(platform.toLowerCase()));
    }

    return result;
}

exports.creare = (gameData) => {
    const newGame = new Game(gameData);
    return newGame.save();
}

exports.getDetails = (id) => {
    const game = Game.findById(id).populate('owner');
    return game;
}

exports.update = async (id, data) => {
    const game = await Game.findById(id);

    game.platform = data.platform,
    game.name = data.name;
    game.image = data.image;
    game.price = Number(data.price);
    game.genre = data.genre;
    game.description = data.description;

    return game.save();
}

exports.delete = (id) => Game.findByIdAndDelete(id);

exports.buyGame = async (gameId, userId) => {
    const game = await Game.findById(gameId);
    if (game.boughtBy.includes(userId)) {
        throw new Error('Product is alredy bought!');
    }

    game.boughtBy.push(userId);
    await game.save();
}

// exports.addComment = async (id, commentData) => {
//     const photo = await Photo.findById(id);

//     photo.commentList.push(commentData);

//     return photo.save();
// }

exports.getPhotosbyOwner = (userId) => Photo.find({ owner: userId });