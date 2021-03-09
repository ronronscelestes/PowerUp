var express = require('express');
var router = express.Router();
const GameModel = require('./../models/Game.model')


router.get('/', (req, res, next) => {
    res.render('index')
});

router.get('/search', async (req, res, next) => {
    try {
        const gamesFound = await GameModel.find( { name : new RegExp(req.query.name, 'i') } );
        
        let data = {
            games: gamesFound,
            css: ['index', 'card', 'allGames'],
            js: ['rating-color']
        }
        res.render("games/gamesCateg", data)
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;